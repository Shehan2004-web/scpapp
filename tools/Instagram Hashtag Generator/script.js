const hashtagCategories = {
    general: [
        '#love', '#instagood', '#photooftheday', '#beautiful', '#happy',
        '#cute', '#fashion', '#friends', '#fun', '#smile',
        '#memes', '#funny', '#viral', '#trending', '#fyp',
        '#instadaily', '#picoftheday', '#selfie', '#family'
    ],
    business: [
        '#entrepreneur', '#business', '#marketing', '#socialmedia', '#contentcreator'
    ],
    seasonal: [
        '#2024trends', '#summer2024', '#newyearnewyou', '#motivationmonday', '#transformationtuesday'
    ],
    fitness: [
        '#fitness50k'
    ],
    travel: [
        '#travel50k'
    ],
    food: [
        '#foodie50k'
    ],
    fashion: [
        '#fashion50k'
    ],
    art: [
        '#art50k'
    ],
    engagement: [
        '#50k', '#100k', '#150k', '#200k', '#250k', '#350k', '#450k', '#550k', '#650k', '#750k',
        '#likes', '#followers', '#followforfollow', '#likeforlike'
    ]
};

function generateHashtags() {
    const keyword = document.getElementById('keyword').value.trim();
    const category = document.getElementById('category').value;
    let hashtags = [];

    if (keyword) {
        // Add category-specific hashtags
        if (hashtagCategories[category]) {
            hashtags = hashtagCategories[category].map(tag => `${tag} ${keyword}`);
        } else {
            hashtags = ['Please select a valid category.'];
        }
        document.getElementById('hashtags').value = hashtags.join('\n');
    } else {
        document.getElementById('hashtags').value = 'Please enter a keyword.';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});