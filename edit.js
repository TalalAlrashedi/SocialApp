class Post {
    constructor(postData) {
        this.id = postData.id;
        this.title = postData.title;
        this.body = postData.body;
        this.image = postData.image;
        this.author = postData.author;
        this.createdAt = postData.created_at;
        this.commentsCount = postData.comments_count;
    }

    render() {
        return `
            <div class="card shadow">
                <div class="card-header">
                    <img src="${this.author.profile_image}" style="height: 40px; width: 40px;" class="rounded-circle pt-2 border border-2">
                    <b>@${this.author.username}</b>
                </div>
                <div class="card-body">
                    <img class="w-100" src="${this.image}">
                    <h6 style="color: grey;" class="pt-1">${this.createdAt} ago</h6>
                    <h4>${this.title}</h4>
                    <p>${this.body}</p>
                    <hr>
                    <div>
                        <span>(${this.commentsCount}) Comments</span>
                    </div>
                </div>
            </div>
        `;
    }
}

class PostManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.postsContainer = document.getElementById("Posts");
    }

    fetchPosts() {
        axios.get(`${this.baseUrl}/posts?limit=10`)
            .then((response) => {
                const posts = response.data.data.map(postData => new Post(postData));
                this.postsContainer.innerHTML = posts.map(post => post.render()).join('');
            })
            .catch(error => console.error("Error fetching posts:", error));
    }

    createPost(title, body, image) {
        const token = localStorage.getItem("token");
        let formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("image", image);

        axios.post(`${this.baseUrl}/posts`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            showSuccess("تم إرسال المنشور بنجاح", "success");
            this.fetchPosts(); // إعادة تحميل المنشورات بعد الإضافة
        })
        .catch(error => {
            const message = error.response?.data?.message || "حدث خطأ أثناء إضافة المنشور";
            showSuccess(message, "danger");
        });
    }
}
const postManager = new PostManager("https://tarmeezacademy.com/api/v1");
postManager.fetchPosts();

document.getElementById("addPostBtn").addEventListener("click", () => {
    const title = document.getElementById("title-post-input").value;
    const body = document.getElementById("body-post-input").value;
    const image = document.getElementById("image-post-input").files[0];

    postManager.createPost(title, body, image);
});
