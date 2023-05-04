#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>
#include <cjson/cJSON.h>

// Current Software Version
const int current_version_major = 3;
const int current_version_minor = 0;

// Host
char *server_host = "trello.com";
char *server_file = "/download/latest-version.json";
char *server_card = "/1/cards/63f9651eae24a9d014e9a29d";
char *server_attachment = "/attachments/63f96541a9ab757f0fb4c553";

struct curl_custom_response_buffer {
	char *ptr;
	size_t len;
};

void curl_custom_response_buffer_init(struct curl_custom_response_buffer *s) {
	s->len = 0;
	s->ptr = malloc(s->len+1);
	if (s->ptr == NULL) {
		fprintf(stderr, "malloc() failed\n");
		exit(EXIT_FAILURE);
	}
	s->ptr[0] = '\0';
}

size_t curl_custom_response_write_handler(void *ptr, size_t size, size_t nmemb, struct curl_custom_response_buffer *s) {
	size_t new_len = s->len + size*nmemb;
	s->ptr = realloc(s->ptr, new_len+1);
	if (s->ptr == NULL) {
		fprintf(stderr, "realloc() failed\n");
		exit(EXIT_FAILURE);
	}
	memcpy(s->ptr+s->len, ptr, size*nmemb);
	s->ptr[new_len] = '\0';
	s->len = new_len;

	return size*nmemb;
}

int checkForNewVersion() {
	CURL *curl;
	CURLcode res;

	// Set URL
	char url[256];
	url[0] = '\0';
	strcpy(url, "https://");
	strcat(url, server_host);

	// Initialise curl
	curl_global_init(CURL_GLOBAL_ALL);
	// get a curl handle
	curl = curl_easy_init();
	if (!curl) {
		return -1;
	}

	// Init response buffer
	struct curl_custom_response_buffer response;
	curl_custom_response_buffer_init(&response);

	// Init headers
	struct curl_slist *headers = NULL;
	headers = curl_slist_append(headers, "user-agent: PBoard Updater v0.2");

	// Prepare URL
	strcat(url, server_card);
	strcat(url, server_attachment);
	strcat(url, server_file);
	//printf(url);
	curl_easy_setopt(curl, CURLOPT_URL, url);
	// Data to be POSTed
	//curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "fistname=thanos&lastname=gram");

	// Set Headers
	curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
	// Set response handler and buffer
	curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, curl_custom_response_write_handler);
	curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

	// Start request
	res = curl_easy_perform(curl);
	// Check for errors
	if (res != CURLE_OK) {
		if (response.ptr != NULL) {
			free(response.ptr);
		}
		curl_easy_cleanup(curl);
		curl_slist_free_all(headers);
		//fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
		return -2;
	}

	// Cleanup
	curl_easy_cleanup(curl);
	curl_slist_free_all(headers);

	// The response data
	// printf("%s\n", response.ptr);

	// Parse response
	cJSON *json = cJSON_Parse(response.ptr);
	if (json == NULL) {
		//const char *error_ptr = cJSON_GetErrorPtr();
		//if (error_ptr != NULL) {
		//	fprintf(stderr, "Error before: %s\n", error_ptr);
		//}
		cJSON_Delete(json);
		free(response.ptr);
		return -3;
	}

	// Get version info
	cJSON *version = cJSON_GetObjectItemCaseSensitive(json, "version");
	if (!cJSON_IsObject(version)) {
		cJSON_Delete(json);
		free(response.ptr);
		return -4;
	}
	cJSON *version_major = cJSON_GetObjectItemCaseSensitive(version, "major");
	cJSON *version_minor = cJSON_GetObjectItemCaseSensitive(version, "minor");
	cJSON *version_changelog = cJSON_GetObjectItemCaseSensitive(version, "changelog");
	if (!cJSON_IsNumber(version_major) || !cJSON_IsNumber(version_minor) || !cJSON_IsString(version_changelog)) {
		cJSON_Delete(json);
		free(response.ptr);
		return -5;
	}

	// Check if new version
	if (
		version_major->valueint > current_version_major ||
		(
			version_major->valueint == current_version_major &&
			version_minor->valueint > current_version_minor
		)
	) {
		printf("There is a new version %d.%d available!\n", version_major->valueint, version_minor->valueint);
		printf("Changelog:\n%s\n", version_changelog->valuestring);
		
		cJSON_Delete(json);
		free(response.ptr);

		return 1;
	}
	else {
		printf("The currently installed version %d.%d is the latest available.\n", current_version_major, current_version_minor);
		
		cJSON_Delete(json);
		free(response.ptr);

		return 0;
	}
}

int main(void) {
	int r = checkForNewVersion();
	curl_global_cleanup();
	if (r < 0) {
		printf("Fatal Error! Please contact CTF admins! (error code %d)\n", r*(-1));
	}
	return 0;
}
