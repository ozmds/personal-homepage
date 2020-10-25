dev:
	docker-compose -f deployments/docker-compose.yml build
	docker-compose -f deployments/docker-compose.yml down -v
	docker-compose -f deployments/docker-compose.yml up -d --force-recreate

live:
	docker-compose -f deployments/docker-compose.prod.yml build
	docker-compose -f deployments/docker-compose.prod.yml down -v
	docker-compose -f deployments/docker-compose.prod.yml up -d --force-recreate
	docker tag deployments_homepage_ui gcr.io/personal-285813/homepageui
	docker push gcr.io/personal-285813/homepageui

deploy:
	gcloud run deploy homepageui --image gcr.io/personal-285813/homepageui --platform managed --port 80 --region us-east1

firebase: 
	firebase deploy

list_running_containers:
	docker ps -a

list_all_images:
	docker image ls

remove_image: 
	docker rmi $(image)

remove_container:
	docker rm $(container)

remove_all_images:
	docker rmi $(docker images -q)

stop_all_containers:
	docker stop $(docker ps -a -q)

delete_all_stopped_containers:
	docker rm $(docker ps -a -q)

list_all_projects:
	gcloud projects list

select_project:
	gcloud config set project $(project)

list_all_firebase_projects:
	firebase projects:list

select_firebase_project:
	firebase use $(project)