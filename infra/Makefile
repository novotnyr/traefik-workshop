all:
	@echo 'Use a specific target'
sync-traefik-config:
	ansible-playbook -i inventory.ini playbooks/sync-traefik-config.yaml
sync-nginx-config:
	ansible-playbook -i inventory.ini playbooks/sync-nginx-config.yaml
sync-traefik-systemd-config:
	ansible-playbook -i inventory.ini playbooks/sync-traefik-systemd-config.yaml

deploy-fe:
	ansible-playbook -i inventory.ini -e "fe_dist=$(PWD)/../fe/" playbooks/deploy-frontend.yaml
deploy-be:
	ansible-playbook -i inventory.ini -e "mvn_target=$(PWD)/../be/target" playbooks/deploy-backend.yaml
