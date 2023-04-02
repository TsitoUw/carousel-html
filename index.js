const carousel = document.querySelector('.carousel');
const arrowIcons = document.querySelectorAll('.warpper i');
const firstImg = carousel.querySelectorAll('img')[0];

let isDragStart = false,isDragging=false, prevPageX, prevScrollLeft, positionDiff;
let scrollWidh = carousel.scrollWidth - carousel.clientWidth;

const showHiddenIcon = () => {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'flex';
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidh ? 'none' : 'flex';
}

arrowIcons.forEach(icon => {
  icon.addEventListener('click',()=>{
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
    // showHiddenIcon()
  })
});

const autoSlide = () => {
  if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;
  if(carousel.scrollLeft > prevScrollLeft){
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragStart) return
  e.preventDefault();
  isDragging = true;
  carousel.classList.add('dragging');
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft =  prevScrollLeft - positionDiff;
  showHiddenIcon()
}

const dragStop = (e) => {
  isDragStart = false;
  carousel.classList.remove('dragging');
  if(!isDragging) return;
  isDragging = true;
  autoSlide()
}

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);