Architektura
=============

- Angular Frontend - servovany cez Nginx
- Spring Boot REST API Backend - servovany cez embedded Tomcat
- Traefik - reverse prosy

Nginx vie tiez fungovat ako reverse proxy. Vyzaduje to zlozitejsiu podporu pre Let's encrypt certifikaty.

Traefik zaroven otvara cestu pre dockerovske kontajnery.

Instalacie
==========

nginx
-----

Nainstalujeme `nginx`

    apt install nginx

Upraceme standardny konfigurak

    vim /etc/nginx/sites-available/default

Odstranime vsetko - nebudeme pocuvat na 80ke, urobi to Traefik

Nahodime konfigurak pre nas virtual host `dander.btcmp.net` do `/etc/nginx/sites-available/dander.btcmp.net`

Symlinkneme do povolenych siteov

    ln -s /etc/nginx/sites-available/dander.btcmp.net /etc/nginx/sites-enabled/

Reloadneme 

    service nginx restart

Ocakava sa, ze to zacne servovat subory na porte 8081 z `/home/winston/www`

traefik
-------

Ako `root`:

    mkdir -p /opt/traefik
    cd /opt/traefik
    wget https://github.com/traefik/traefik/releases/download/v2.6.6/traefik_v2.6.6_linux_amd64.tar.gz
    tar xvfz traefik_v2.6.6_linux_amd64.tar.gz
    rm traefik_v2.6.6_linux_amd64.tar.gz


Vyrobime pouzivatela a nastavime permissions

    useradd -d /opt/traefik --create-home --system --shell /usr/sbin/nologin traefik
    chown -R traefik:traefik /opt/traefik

Nastavime capabilities, aby traefik bezal na 80 aj pod nonroot userom:

    setcap 'cap_net_bind_service=+ep' /opt/traefik/traefik

Vytvorime adresar pre konfiguraky?

    mkdir -p /etc/traefik/acme
    chown traefik:traefik /etc/traefik/acme

Editneme systemd konfigurak pre sluzbu

    vim /etc/systemd/system/traefik.service

Obsah:

    [Unit]
    Description=Traefik Proxy
    After=network-online.target
    Wants=network-online.target systemd-networkd-wait-online.service
    
    [Service]
    Restart=on-abnormal
    
    User=traefik
    Group=traefik
    
    ExecStart=/opt/traefik/traefik
    
    LimitNOFILE=1048576
    
    PrivateTmp=true
    ProtectHome=true
    ProtectSystem=full
    ReadWriteDirectories=/etc/traefik/acme
    
    CapabilityBoundingSet=CAP_NET_BIND_SERVICE
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    NoNewPrivileges=true
    
    [Install]
    WantedBy=multi-user.target


Reloadneme nastavenia pre systemd:

    systemctl daemon-reload

Startneme traefik

    systemctl start traefik.service

Povolime na autostart pri boote

    systemctl enable traefik.service

Logy pre traefik

    journalctl --boot -u traefik.service --follow

Konfiguraky pre traefik - `traefik.yaml` a `traefik-dynamic.yaml` patria pod `/etc/traefik`.

V `/etc/traefik/acme` sa budu ukladat letsencryptove certifikaty.


