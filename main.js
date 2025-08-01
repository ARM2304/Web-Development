document.addEventListener('DOMContentLoaded', () => {
    const videoChapters = document.querySelectorAll('.video-chapter');
    const galleryContainer = document.querySelector('.video-gallery-container');

  
    const observerOptions = {
        root: galleryContainer, 
        rootMargin: '0px',
        threshold: 0.75 
    };

   
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (video) {
                if (entry.isIntersecting) {
                 
                    console.log(`Chapter ${entry.target.id} is in view.`);
                    if (video.paused) {
                        video.play().catch(error => {
                         
                            if (error.name === "NotAllowedError" && video.muted === false) {
                                console.warn("Autoplay was prevented. Muting video and trying again.");
                                video.muted = true;
                                video.play();
                            } else {
                                console.error("Error playing video:", error);
                            }
                        });
                    }
                } else {
                 
                    if (!video.paused) {
                        video.pause();
                        
                    }
                }
            }
        });
    };

    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    videoChapters.forEach(chapter => {
        observer.observe(chapter);
    });

   
    videoChapters.forEach(chapter => {
        const video = chapter.querySelector('video');
        if (video) {
            video.muted = true; 
        }
    });

 
    let currentChapterIndex = 0;
    galleryContainer.addEventListener('scroll', () => {
        
        const scrollPosition = galleryContainer.scrollTop;
        const viewportHeight = galleryContainer.clientHeight;

        currentChapterIndex = Math.floor((scrollPosition + viewportHeight / 2) / viewportHeight);
        currentChapterIndex = Math.min(Math.max(0, currentChapterIndex), videoChapters.length - 1);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault(); 
            currentChapterIndex = Math.min(currentChapterIndex + 1, videoChapters.length - 1);
            videoChapters[currentChapterIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault(); 
            currentChapterIndex = Math.max(currentChapterIndex - 1, 0);
            videoChapters[currentChapterIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (e.key === 'Home') {
            e.preventDefault();
            currentChapterIndex = 0;
            videoChapters[currentChapterIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (e.key === 'End') {
            e.preventDefault();
            currentChapterIndex = videoChapters.length - 1;
            videoChapters[currentChapterIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});