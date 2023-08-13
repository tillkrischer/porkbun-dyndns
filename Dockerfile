FROM ubuntu

RUN apt-get update
RUN apt-get -y install cron curl

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash 
RUN apt-get update
RUN apt-get -y install nodejs

ADD update-dns.js /root/update-dns.js

RUN crontab -l | { cat; echo "* * * * * node /root/update-dns.js  >/proc/1/fd/1 2>/proc/1/fd/2"; } | crontab -

CMD cron -f

