#!/bin/bash

# Docker Compose Management Script
# Usage: ./docker-manage.sh [command] [service] [compose-file]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compose file configurations
MAIN_COMPOSE_FILE="docker-compose.yml"
SELENIUM_COMPOSE_FILE="selenium-sh-server/docker-compose.yml"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to show usage
show_usage() {
    echo "Docker Compose Management Script"
    echo ""
    echo "Usage: $0 [command] [service] [compose-file]"
    echo ""
    echo "Commands:"
    echo "  start [service] [compose]     - Start all services or specific service"
    echo "  stop [service] [compose]      - Stop all services or specific service"
    echo "  restart [service] [compose]   - Restart all services or specific service"
    echo "  up [service] [compose]        - Create and start services (same as start)"
    echo "  down [service] [compose]               - Stop and remove containers, networks"
    echo "  build [service] [compose]     - Build all services or specific service"
    echo "  logs [service] [compose]      - Show logs for all services or specific service"
    echo "  status [compose]             - Show status of all services"
    echo "  ps [compose]                 - Show running containers"
    echo "  clean [compose]              - Remove containers, networks, volumes (WARNING: data loss)"
    echo "  shell [service] [compose]    - Open shell in running service container"
    echo "  exec [service] [compose]     - Execute command in service container"
    echo "  backup [compose]             - Backup database data"
    echo "  restore [file] [compose]     - Restore database data from backup"
    echo "  health [compose]             - Check health of all services"
    echo "  push [service] [compose]     - Push images to registry aadarshnagrath/allai"
    echo "  start-all                    - Start all services from both compose files"
    echo "  stop-all                     - Stop all services from both compose files"
    echo "  restart-all                  - Restart all services from both compose files"
    echo "  status-all                   - Show status of all services from both compose files"
    echo "  health-all                   - Check health of all services from both compose files"
    echo "  push-all                     - Push all images from both compose files to registry"
    echo "  build-all                    - Build all images from both compose files"
    echo "  help                         - Show this help message"
    echo ""
    echo "Compose Files:"
    echo "  main                         - Main docker-compose.yml (default)"
    echo "  selenium                     - selenium-sh-server/docker-compose.yml"
    echo ""
    echo "Services (Main):"
    echo "  frontend, docs, model-server, db-migrator, mongodb, redis, console"
    echo ""
    echo "Services (Selenium):"
    echo "  flux-server, proxy-server, postgres"
    echo ""
    echo "Examples:"
    echo "  $0 start                    # Start all main services"
    echo "  $0 start frontend           # Start only frontend service"
    echo "  $0 start flux-server selenium # Start flux-server from selenium compose"
    echo "  $0 logs model-server        # Show logs for model-server"
    echo "  $0 shell mongodb            # Open shell in MongoDB container"
    echo "  $0 exec frontend npm install # Run npm install in frontend container"
    echo "  $0 start-all                # Start all services from both compose files"
    echo "  $0 status-all               # Show status of all services from both compose files"
    echo "  $0 push frontend            # Push frontend image to registry"
    echo "  $0 push flux-server selenium # Push flux-server from selenium compose"
    echo "  $0 push-all                 # Push all images from both compose files"
    echo "  $0 build-all                # Build all images from both compose files"
}

# Function to get compose file path
get_compose_file() {
    local compose_type=$1
    case "$compose_type" in
        "selenium"|"selenium-sh-server")
            echo "$SELENIUM_COMPOSE_FILE"
            ;;
        "main"|"")
            echo "$MAIN_COMPOSE_FILE"
            ;;
        *)
            print_error "Unknown compose file type: $compose_type"
            print_error "Available: main, selenium"
            exit 1
            ;;
    esac
}

# Function to run docker-compose command
run_compose() {
    local compose_file=$1
    shift
    local cmd="$*"
    
    if [ ! -f "$compose_file" ]; then
        print_error "Compose file not found: $compose_file"
        exit 1
    fi
    
    docker-compose -f "$compose_file" $cmd
}

# Function to check if service exists
service_exists() {
    local compose_file=$1
    local service=$2
    run_compose "$compose_file" config --services | grep -q "^${service}$"
}

# Function to check if containers are running
containers_running() {
    local compose_file=$1
    run_compose "$compose_file" ps --services --filter "status=running" | wc -l
}

# Function to start services
start_services() {
    local service=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    
    if [ -n "$service" ]; then
        if service_exists "$compose_file" "$service"; then
            print_status "Starting service: $service (from $compose_file)"
            run_compose "$compose_file" up -d "$service"
        else
            print_error "Service '$service' not found in $compose_file"
            exit 1
        fi
    else
        print_status "Starting all services from $compose_file..."
        run_compose "$compose_file" up -d
    fi
}

# Function to stop services
stop_services() {
    local service=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    
    if [ -n "$service" ]; then
        if service_exists "$compose_file" "$service"; then
            print_status "Stopping service: $service (from $compose_file)"
            run_compose "$compose_file" stop "$service"
        else
            print_error "Service '$service' not found in $compose_file"
            exit 1
        fi
    else
        print_status "Stopping all services from $compose_file..."
        run_compose "$compose_file" stop
    fi
}

# Function to restart services
restart_services() {
    local service=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    
    if [ -n "$service" ]; then
        if service_exists "$compose_file" "$service"; then
            print_status "Restarting service: $service (from $compose_file)"
            run_compose "$compose_file" restart "$service"
        else
            print_error "Service '$service' not found in $compose_file"
            exit 1
        fi
    else
        print_status "Restarting all services from $compose_file..."
        run_compose "$compose_file" restart
    fi
}

# Function to build services
build_services() {
    local service=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    
    if [ -n "$service" ]; then
        if service_exists "$compose_file" "$service"; then
            print_status "Building service: $service (from $compose_file)"
            run_compose "$compose_file" build "$service"
        else
            print_error "Service '$service' not found in $compose_file"
            exit 1
        fi
    else
        print_status "Building all services from $compose_file..."
        run_compose "$compose_file" build
    fi
}

# Function to show logs
show_logs() {
    local service=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    
    if [ -n "$service" ]; then
        if service_exists "$compose_file" "$service"; then
            print_status "Showing logs for service: $service (from $compose_file)"
            run_compose "$compose_file" logs -f "$service"
        else
            print_error "Service '$service' not found in $compose_file"
            exit 1
        fi
    else
        print_status "Showing logs for all services from $compose_file..."
        run_compose "$compose_file" logs -f
    fi
}

# Function to show status
show_status() {
    local compose_type=$1
    local compose_file=$(get_compose_file "$compose_type")
    
    print_header "Service Status ($compose_file)"
    run_compose "$compose_file" ps
    echo ""
    print_header "Service Health ($compose_file)"
    run_compose "$compose_file" ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
}

# Function to show running containers
show_containers() {
    local compose_type=$1
    local compose_file=$(get_compose_file "$compose_type")
    
    print_header "Running Containers ($compose_file)"
    run_compose "$compose_file" ps
}

# Function to clean everything
clean_all() {
    local compose_type=$1
    local compose_file=$(get_compose_file "$compose_type")
    
    print_warning "This will remove all containers, networks, and volumes from $compose_file!"
    print_warning "This will result in data loss!"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cleaning all Docker resources from $compose_file..."
        run_compose "$compose_file" down -v --remove-orphans
        print_status "Cleanup completed for $compose_file"
    else
        print_status "Cleanup cancelled"
    fi
}

# Function to open shell in container
open_shell() {
    local service=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    
    if [ -z "$service" ]; then
        print_error "Please specify a service name"
        echo "Available services in $compose_file:"
        run_compose "$compose_file" config --services
        exit 1
    fi
    
    if service_exists "$compose_file" "$service"; then
        print_status "Opening shell in service: $service (from $compose_file)"
        run_compose "$compose_file" exec "$service" /bin/bash
    else
        print_error "Service '$service' not found in $compose_file"
        exit 1
    fi
}

# Function to execute command in container
execute_command() {
    local service=$1
    local compose_type=$2
    shift 2
    local cmd="$*"
    local compose_file=$(get_compose_file "$compose_type")
    
    if [ -z "$service" ] || [ -z "$cmd" ]; then
        print_error "Usage: $0 exec <service> [compose] <command>"
        exit 1
    fi
    
    if service_exists "$compose_file" "$service"; then
        print_status "Executing command in service: $service (from $compose_file)"
        print_status "Command: $cmd"
        run_compose "$compose_file" exec "$service" $cmd
    else
        print_error "Service '$service' not found in $compose_file"
        exit 1
    fi
}

# Function to backup database
backup_database() {
    local compose_type=$1
    local compose_file=$(get_compose_file "$compose_type")
    
    case "$compose_type" in
        "selenium"|"selenium-sh-server")
            backup_postgres "$compose_file"
            ;;
        "main"|"")
            backup_mongodb "$compose_file"
            ;;
    esac
}

# Function to backup MongoDB
backup_mongodb() {
    local compose_file=$1
    local backup_dir="./backups"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="${backup_dir}/mongodb_backup_${timestamp}"
    
    mkdir -p "$backup_dir"
    
    print_status "Creating MongoDB backup..."
    run_compose "$compose_file" exec mongodb mongodump --uri="mongodb://root:example@localhost:27017/allai?authSource=admin" --out="/tmp/backup"
    docker cp mongodb_container:/tmp/backup "$backup_file"
    run_compose "$compose_file" exec mongodb rm -rf /tmp/backup
    
    print_status "Backup created: $backup_file"
}

# Function to backup PostgreSQL
backup_postgres() {
    local compose_file=$1
    local backup_dir="./backups"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="${backup_dir}/postgres_backup_${timestamp}.sql"
    
    mkdir -p "$backup_dir"
    
    print_status "Creating PostgreSQL backup..."
    run_compose "$compose_file" exec -T postgres psql -U user -d iptable > "$backup_file"
    
    print_status "Backup created: $backup_file"
}

# Function to restore database
restore_database() {
    local backup_file=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    
    case "$compose_type" in
        "selenium"|"selenium-sh-server")
            restore_postgres "$backup_file" "$compose_file"
            ;;
        "main"|"")
            restore_mongodb "$backup_file" "$compose_file"
            ;;
    esac
}

# Function to restore MongoDB
restore_mongodb() {
    local backup_file=$1
    local compose_file=$2
    
    if [ -z "$backup_file" ]; then
        print_error "Please specify a backup file"
        echo "Usage: $0 restore <backup_file> [compose]"
        exit 1
    fi
    
    if [ ! -d "$backup_file" ]; then
        print_error "Backup directory not found: $backup_file"
        exit 1
    fi
    
    print_warning "This will overwrite existing data in MongoDB!"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Restoring MongoDB from backup: $backup_file"
        docker cp "$backup_file" mongodb_container:/tmp/restore
        run_compose "$compose_file" exec mongodb mongorestore --uri="mongodb://root:example@localhost:27017/allai?authSource=admin" /tmp/restore
        run_compose "$compose_file" exec mongodb rm -rf /tmp/restore
        print_status "Restore completed"
    else
        print_status "Restore cancelled"
    fi
}

# Function to restore PostgreSQL
restore_postgres() {
    local backup_file=$1
    local compose_file=$2
    
    if [ -z "$backup_file" ]; then
        print_error "Please specify a backup file"
        echo "Usage: $0 restore <backup_file> [compose]"
        exit 1
    fi
    
    if [ ! -f "$backup_file" ]; then
        print_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    print_warning "This will overwrite existing data in PostgreSQL!"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Restoring PostgreSQL from backup: $backup_file"
        run_compose "$compose_file" exec -T postgres psql -U user -d iptable < "$backup_file"
        print_status "Restore completed"
    else
        print_status "Restore cancelled"
    fi
}

# Function to check health
check_health() {
    local compose_type=$1
    local compose_file=$(get_compose_file "$compose_type")
    
    print_header "Health Check ($compose_file)"
    
    # Check if containers are running
    local running_count=$(containers_running "$compose_file")
    local total_count=$(run_compose "$compose_file" config --services | wc -l)
    
    echo "Running containers: $running_count/$total_count"
    echo ""
    
    # Check each service
    for service in $(run_compose "$compose_file" config --services); do
        local status=$(run_compose "$compose_file" ps -q "$service" | xargs docker inspect --format='{{.State.Status}}' 2>/dev/null || echo "not running")
        if [ "$status" = "running" ]; then
            echo -e "${GREEN}✓${NC} $service: $status"
        else
            echo -e "${RED}✗${NC} $service: $status"
        fi
    done
    
    echo ""
    
    # Check ports based on compose file
    print_header "Port Status ($compose_file)"
    if [ "$compose_type" = "selenium" ] || [ "$compose_file" = "$SELENIUM_COMPOSE_FILE" ]; then
        echo "Flux Server: http://localhost:7001"
        echo "Proxy Server: http://localhost:7003"
        echo "PostgreSQL: localhost:55432"
    else
        echo "Frontend: http://localhost:3000"
        echo "Docs: http://localhost:3001"
        echo "Model Server: http://localhost:8000"
        echo "Console: http://localhost:4044"
        echo "MongoDB: localhost:27017"
        echo "Redis: localhost:6379"
    fi
}

# Function to start all services from both compose files
start_all_services() {
    print_header "Starting All Services"
    print_status "Starting main services..."
    start_services "" "main"
    print_status "Starting selenium services..."
    start_services "" "selenium"
    print_status "All services started!"
}

# Function to stop all services from both compose files
stop_all_services() {
    print_header "Stopping All Services"
    print_status "Stopping selenium services..."
    stop_services "" "selenium"
    print_status "Stopping main services..."
    stop_services "" "main"
    print_status "All services stopped!"
}

# Function to restart all services from both compose files
restart_all_services() {
    print_header "Restarting All Services"
    print_status "Restarting main services..."
    restart_services "" "main"
    print_status "Restarting selenium services..."
    restart_services "" "selenium"
    print_status "All services restarted!"
}

# Function to show status of all services from both compose files
show_all_status() {
    print_header "All Services Status"
    show_status "main"
    echo ""
    show_status "selenium"
}

# Function to check health of all services from both compose files
check_all_health() {
    print_header "All Services Health Check"
    check_health "main"
    echo ""
    check_health "selenium"
}

# Function to push images to registry
push_images() {
    local service=$1
    local compose_type=$2
    local compose_file=$(get_compose_file "$compose_type")
    local registry="aadarshnagrath/allai"
    
    if [ -n "$service" ]; then
        if service_exists "$compose_file" "$service"; then
            print_status "Pushing service: $service (from $compose_file) to $registry"
            
            # Get the image name and tag from docker-compose images
            local image_info=$(run_compose "$compose_file" images -q "$service" 2>/dev/null | head -1)
            if [ -n "$image_info" ]; then
                # Tag the image with registry
                local full_image_name="${registry}:${service}"
                print_status "Tagging image as: $full_image_name"
                docker tag "$image_info" "$full_image_name"
                
                # Push the image
                print_status "Pushing image: $full_image_name"
                docker push "$full_image_name"
                
                print_status "Successfully pushed: $full_image_name"
            else
                print_error "Could not find image for service: $service"
                print_error "Make sure the service is built and running"
                exit 1
            fi
        else
            print_error "Service '$service' not found in $compose_file"
            exit 1
        fi
    else
        print_status "Pushing all images from $compose_file to $registry..."
        
        # Get all services and push each one
        for service_name in $(run_compose "$compose_file" config --services); do
            print_status "Processing service: $service_name"
            
            # Get the image ID for this service
            local image_id=$(run_compose "$compose_file" images -q "$service_name" 2>/dev/null | head -1)
            if [ -n "$image_id" ]; then
                # Tag the image with registry
                local full_image_name="${registry}:${service_name}"
                print_status "Tagging image as: $full_image_name"
                docker tag "$image_id" "$full_image_name"
                
                # Push the image
                print_status "Pushing image: $full_image_name"
                docker push "$full_image_name"
                
                print_status "Successfully pushed: $full_image_name"
            else
                print_warning "Could not find image for service: $service_name"
                print_warning "Make sure the service is built and running"
            fi
        done
    fi
}

# Function to push all images from both compose files
push_all_images() {
    print_header "Pushing All Images to Registry"
    print_status "Pushing main services..."
    push_images "" "main"
    print_status "Pushing selenium services..."
    push_images "" "selenium"
    print_status "All images pushed to registry!"
}

# Function to build all images from both compose files
build_all_images() {
    print_header "Building All Images"
    print_status "Building main services..."
    build_services "" "main"
    print_status "Building selenium services..."
    build_services "" "selenium"
    print_status "All images built!"
}

# Main script logic
case "${1:-help}" in
    start|up)
        start_services "$2" "$3"
        ;;
    stop)
        stop_services "$2" "$3"
        ;;
    restart)
        restart_services "$2" "$3"
        ;;
    build)
        build_services "$2" "$3"
        ;;
    logs)
        show_logs "$2" "$3"
        ;;
    status)
        show_status "$2"
        ;;
    ps)
        show_containers "$2"
        ;;
    clean)
        clean_all "$2"
        ;;
    shell)
        open_shell "$2" "$3"
        ;;
    exec)
        shift
        execute_command "$@"
        ;;
    backup)
        backup_database "$2"
        ;;
    restore)
        restore_database "$2" "$3"
        ;;
    health)
        check_health "$2"
        ;;
    start-all)
        start_all_services
        ;;
    stop-all)
        stop_all_services
        ;;
    restart-all)
        restart_all_services
        ;;
    status-all)
        show_all_status
        ;;
    health-all)
        check_all_health
        ;;
    push)
        push_images "$2" "$3"
        ;;
    push-all)
        push_all_images
        ;;
    build-all)
        build_all_images
        ;;
    down)
        service=$2
        compose_type=$3
        compose_file=$(get_compose_file "$compose_type")
        
        if [ -n "$service" ]; then
            if service_exists "$compose_file" "$service"; then
                print_status "Stopping and removing service: $service (from $compose_file)"
                run_compose "$compose_file" stop "$service"
                run_compose "$compose_file" rm -f "$service"
            else
                print_error "Service '$service' not found in $compose_file"
                exit 1
            fi
        else
            print_status "Stopping and removing containers from $compose_file..."
            run_compose "$compose_file" down
        fi
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_usage
        exit 1
        ;;
esac 