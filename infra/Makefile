all:
	echo 'Use a specific target'
sync-config:
	ansible-playbook -i inventory.ini playbooks/sync-config.yaml
sync-nginx-config:
	ansible-playbook -i inventory.ini playbooks/sync-nginx-config.yaml

deploy-fe:
	ansible-playbook -i inventory.ini -e "fe_dist=$(PWD)/../fe/" playbooks/deploy.yaml
deploy-be:
	ansible-playbook -i inventory.ini -e "mvn_target=$(PWD)/../be/target" playbooks/deploy-backend.yaml
