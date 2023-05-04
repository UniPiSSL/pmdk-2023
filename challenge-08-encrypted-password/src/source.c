#include <stdio.h>
#include <string.h>

int flag_len = 29;
char ecrypted_flag[] = {39, 40, 44, 46, 21, 31, 74, 41, 64, 6, 1, 3, 49, 2, 49, 23, 5, 61, 22, 100, 29, 27, 10, 38, 59, 61, 27, 1, 16};

void encrypt_password(int key, char *password, char *encrypted) {
	int len = strlen(password);
	for (int i = 0; i < len; ++i) {
		encrypted[i] = password[i] + (i % key);
	}
	encrypted[len - 1] = '\n';
}

void print_flag(char *username, char * password) {
	int i = 0;
	do {
		for (int j = 0; j < strlen(username) - 1 && i < flag_len; ++j) {
			printf("%c", (ecrypted_flag[i] ^ username[j]));
			i++;
		}
		for (int j = 0; j < strlen(password) - 1 && i < flag_len; ++j) {
			printf("%c", (ecrypted_flag[i] ^ password[j]));
			i++;
		}
	} while (i < flag_len);
	printf("\n");
}

int main(void) {
	char username[256];
	char password[256];

	printf("-= Please authenticate =-\n");

	// Get username
	printf("username: ");
	fflush(stdout);
	fgets(username, 255, stdin);

	// Get password
	printf("password: ");
	fflush(stdout);
	fgets(password, 255, stdin);

	// If username is correct
	if (strcmp(username, "admin\n") != 0) {
		printf("Error! Unknown user.\n");
		return 1;
	}

	// Check if password is correct
	char encrypted[256];
	encrypt_password(5, password, encrypted);
	if (strcmp(encrypted, "mzavXr1pJcp5uv[osF\n") != 0) {
		printf("Error! Incorrect password.\n");
		return 1;
	}

	printf("Successful authentication!\n");
	printf("\n");

	// Print flag
	print_flag(username, password);
	
	return 0;
}
