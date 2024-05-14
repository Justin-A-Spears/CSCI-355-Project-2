let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

// move to the next slide
function moveToNextSlide() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
}

// move to the previous slide
function moveToPrevSlide() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
}

// Event listener for next button click
next.addEventListener('click', function() {
    moveToNextSlide();
});

// Event listener for previous button click
prev.addEventListener('click', function() {
    moveToPrevSlide();
});

// Automatic scrolling 
let intervalId; // interval ID

function startAutoScroll() {
    intervalId = setInterval(function() {
        moveToNextSlide();
    }, 5500); // interval in milliseconds
}

// autoscroll function
function stopAutoScroll() {
    clearInterval(intervalId);
}

// automatic scroll when page loads 
startAutoScroll();

// stop autoscroll when interacting 
document.querySelector('.slide').addEventListener('mouseover', function() {
    stopAutoScroll();
});

document.querySelector('.slide').addEventListener('mouseleave', function() {
    startAutoScroll();
});
