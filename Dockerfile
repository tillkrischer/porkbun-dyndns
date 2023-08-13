FROM ubuntu

RUN apt-get update
RUN apt-get -y install cron curl

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash 
RUN apt-get update
RUN apt-get -y install nodejs

ADD update-dns.js . 
ADD run.sh . 

CMD bash run.sh

