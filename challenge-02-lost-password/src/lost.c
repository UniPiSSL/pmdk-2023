#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

void decrypt(int* e, int key) {
	char f[0x26];
	
	int i;
	for (i = 0; i < 0x26; i++) {
		f[i] = (char)(e[i] ^ key);
	}
	f[i] = 0x00;
	
	printf("%s\n", f);
}

int a = 0x10001;
int b = 0x12345;

int main(int argc, char *argv[]) {
	uint32_t encf[] = {0x4e, 0x69, 0x63, 0x65, 0x20, 0x74, 0x72, 0x79, 0x8ba81, 0x8ba8b, 0x8ba86, 0x8ba80, 0x8babc, 0x8baf3, 0x8baa3,
							 0x8baa6, 0x8baa5, 0x8bafe, 0x8baf3, 0x8baa5, 0x8baa6, 0x8bafe,
							 0x8baf5, 0x8baf6, 0x8baf7, 0x8baff, 0x8baa4, 0x8baa3, 0x8baf4,
							 0x8baf1, 0x8baa2, 0x8baf5, 0x8baf6, 0x8baf5, 0x8baf5, 0x8baf2,
							 0x8baf1, 0x8baa5, 0x8baf2, 0x8baf3, 0x8baff, 0x8baf1, 0x8bafe,
							 0x8baf0, 0x8baa5, 0x8baba};
	
	
	int p = a;
	p += b;
	p += 0x69781;
	
	unsigned int input;
	
	printf("Enter the secret pin: ");
	scanf("%d", &input);
	
	if (input == p) {
		printf("Correct PIN! (:\n");
		decrypt(encf+8, p);
	} else {
		printf("Wrong PIN! :(\n");
	}
	
}
