# Shopping Cart (Slice Assignment)

### Prerequisites
Make sure you have already installed both [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

#### 1. Setting up Configuration
Copy `config/local-sample.js` to `config/local.js`
```
cp config/local-sample.js config/local.js
```

#### 2. Start Application
To setup and launch both applications including all of their dependencies, use
```
docker-compose up --build
```

Application will start on `http://localhost:3000/graphql`

Note: The database data directory for postgresql has been mounted as a volume as ```pgdata --> /var/lib/postgresql/data``` so we do not lose data between runs.

##### Queries
1. Get total items
    ```
    query {
      total_items
    }
    ```

##### Mutations
1. Create/add category
    ```
    mutation m {
      add_category(data: {
        name: "<Category Name>"
      }) {
        success
        message
        data
        errors
      }
    }
    ```

2. Create/add item
    ```
    mutation m {
      add_item(data: {
        category_id: "<Category ID>"
        name: "<Item Name>"
      }) {
        success
        message
        data
        errors
      }
    }
    ```