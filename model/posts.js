module.exports = {
    posts: [
        {
            id: "sdjhnfljan",
            title: "Primeiro post do mural",
            description: "Descrição qualquer"
        }
    ],

    getAll() {
        return this.posts
    },

    newPost(title, description) {
        this.posts.push({id: this.generateId(), title, description})
    },

    deletePost(id) {
        this.posts = this.posts.filter((post) => {
            return post.id != id
        })
    },

    generateId: () => {
        return Math.random().toString(36).substr(2, 9)
    }
}