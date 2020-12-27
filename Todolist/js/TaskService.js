function TodoService() {
    this.getListTask = function() {
            return axios({
                url: "https://5fbfc021fd14be00167490a4.mockapi.io/data",
                method: "GET"
            })
        },
        this.addTask = function(id) {
            return axios({
                url: "https://5fbfc021fd14be00167490a4.mockapi.io/data",
                method: "POST",
                data: id
            })
        },
        this.deleteTask = function(id) {
            return axios({
                url: `https://5fbfc021fd14be00167490a4.mockapi.io/data/${id}`,
                method: "DELETE"
            })
        },
        this.getTaskById = function(id) {
            return axios({
                url: `https://5fbfc021fd14be00167490a4.mockapi.io/data/${id}`,
                method: "GET"
            })
        },
        this.updateTask = function(id) {
            return axios({
                url: `https://5fbfc021fd14be00167490a4.mockapi.io/data/${id.id}`,
                method: "PUT",
                data: id
            })
        }
}