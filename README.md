simple-ng-boilerplate - The Simple unopinionated Angular Boilerplate to start you off with Angular
=====================

Let's get started!

Assuming you're using a mac or linux with the terminal and have an apache setup in xampp or mamp or whatever...

clone the repo:

```
git clone git@github.com:canvaspixels/simple-ng-boilerplate.git
```

If you are using apache create yourself a virtual host in your apache config (usually located at /etc/apache2/extra/httpd-vhosts.conf)

```
<VirtualHost *:80>
    DocumentRoot "/path/to/simple-ng-bootstrap"
    ServerName ngbootstrap.dev
</VirtualHost>
```

Add this to your /etc/hosts file
```
127.0.0.1 ngbootstrap.dev
```

Then head on over to [http://ngbootstrap.dev/my-page](http://ngbootstrap.dev/my-page)