<<<<<<< HEAD
console.log(threads);
var container = document.querySelector('ol');
for (let thread of threads) {
    var html = `
    <li class="row">
        <a href="/thread.html?${thread.id}">
            <h4 class="title-thread">
                ${thread.title}
            </h4>
            <div class="bottom">
                <p class="timestamp">
                    ${new Date(thread.date).toLocaleString()}
                </p>
                <p class="comment-count">
                    ${thread.comments.length} comments
                </p>
            </div>
        </a>
    </li>
    `
    container.insertAdjacentHTML('beforeend', html);
=======
console.log(threads);
var container = document.querySelector('ol');
for (let thread of threads) {
    var html = `
    <li class="row">
        <a href="/thread.html?${thread.id}">
            <h4 class="title-thread">
                ${thread.title}
            </h4>
            <div class="bottom">
                <p class="timestamp">
                    ${new Date(thread.date).toLocaleString()}
                </p>
                <p class="comment-count">
                    ${thread.comments.length} comments
                </p>
            </div>
        </a>
    </li>
    `
    container.insertAdjacentHTML('beforeend', html);
>>>>>>> 382ed10784c1afc4e55fe17ea60f40f7dc569da4
}