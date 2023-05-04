FROM php:apache
LABEL maintainer="gramthanos@gmail.com"

# Copy challenge files
RUN rm -rf /var/www/html
COPY html /var/www/html
COPY flag.txt /var/www/flag.txt
RUN chown -R www-data:www-data /var/www/html /var/www/flag.txt

# Expose port
EXPOSE 80
