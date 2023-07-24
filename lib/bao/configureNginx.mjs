import { readdirSync, writeFileSync } from "node:fs";
import { pwd } from "../utils/pwd.mjs";
import { awd } from "../utils/awd.mjs";
import { log } from "../misc.mjs";
import { readSiteConfig } from "./readSiteConfig.mjs";
import { Bao } from "./bao.mjs";
import { join } from "node:path";

const nginxConfig = (config) => `
server {
    listen 443 ssl spdy; # we enable SPDY here
    server_name ${config.name}; # this domain must match Common Name (CN) in the SSL certificate

    root html; # irrelevant
    index index.html; # irrelevant

    #ssl_certificate /etc/nginx/ssl/todos.pem; # full path to SSL certificate and CA certificate concatenated together
    #ssl_certificate_key /etc/nginx/ssl/todos.key; # full path to SSL key
    #ssl_stapling on;
    #ssl_session_cache shared:SSL:10m;
    #ssl_session_timeout 5m;
    #ssl_prefer_server_ciphers on;
    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:ECDHE-RSA-RC4-SHA:ECDHE-ECDSA-RC4-SHA:RC4-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!3DES:!MD5:!PSK';
    #add_header Strict-Transport-Security "max-age=31536000;";

    if ($http_user_agent ~ "MSIE" ) {
        return 303 https://browser-update.org/update.html;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade; # allow websockets
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Forwarded-For $remote_addr; # preserve client IP
        if ($uri != '/') {
            expires 30d;
        }
    }
}
`;

export async function configureNginx() {
	const sitesDirs = readdirSync(Bao.sitesDir);
	const configs = await Promise.all(sitesDirs.map(readSiteConfig));
	const fullConfig = configs.map(nginxConfig).join("\n\n");
	writeFileSync(join(Bao.baoDir, "bao.nginx"), fullConfig, "utf-8");
	log("--- nginx ---");
	log("add to /etc/nginx/sites-enabled");
	log(`include ${Bao.baoDir}/bao.nginx;`);
}
