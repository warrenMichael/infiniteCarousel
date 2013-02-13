carousel = function(carouselContainer) {
  var carousel = $(carouselContainer);
  var slide = $(carousel).find('.slide');
  var slideContainer = $(carousel).find('.slide-container');
  var slideWidth = $(slide).width();
  var thumbs = $(carousel).find('.thumb');
  var previous = $(carousel).find('.previous');
  var next = $(carousel).find('.next');
  var slideAmount = slide.length;

  if (previous.length || next.length) {
    var lastSlideClone = carousel.find('.slide-container div:first').clone();
    var firstSlideClone = carousel.find('.slide-container div:last').clone();

    slideContainer.find('div:first').before($(firstSlideClone));
    slideContainer.find('div:last').after($(lastSlideClone));

    //Remove Data Slide Off cloned first and last node
    slideContainer.find('div:first').removeAttr('data-slide');
    slideContainer.find('div:last').removeAttr('data-slide');

  }

  slideContainer.css('left', -(slideWidth * 1));

  $(thumbs[0]).addClass('active');
  $(slide[0]).addClass('active');

  previous.click(function(e){
    e.preventDefault();
    thumbs.removeClass('active');
    var currentSlide = slideContainer.find('.active');
    currentSlideNumber = currentSlide.attr('data-slide');
    slide.removeClass('active');

    if (currentSlideNumber > 1) {
      nextSlide = (currentSlideNumber - 0) - 1;
      nextThumb = (currentSlideNumber - 0) - 1;
    }
    else {
      nextSlide = slideAmount;
    }
    $(".slide"+nextSlide).each(function(i) {
      if ($(this).attr('data-slide') !== undefined) {
         $(this).addClass('active');
      }
    });
    $('.thumb'+(nextSlide)).addClass('active');
    
    currentPosition = slideContainer.css('left');
    currentPositionNumber = currentPosition.split('px');
    newPosition = (currentPositionNumber[0] - 0) + slideWidth;
    slideContainer.animate({'left' : newPosition}, 2000);
    if(currentPosition === (-(slideWidth) + 'px')) {
      slideContainer.animate({'left' : (-slideWidth * slideAmount)}, 2000);
    }
  });

  next.click(function(e){
    e.preventDefault();
    thumbs.removeClass('active');
    var currentSlide = slideContainer.find('.active');
    currentSlideNumber = currentSlide.attr('data-slide');
    slide.removeClass('active');
    if (currentSlideNumber < slideAmount) {
      nextSlide = (currentSlideNumber - 0) + 1;
    }
    else {
      nextSlide = 1;
    }
    $(".slide"+nextSlide).each(function(i) {
      if ($(this).attr('data-slide') !== undefined) {
         $(this).addClass('active');
      }
    });
    $('.thumb'+(nextSlide)).addClass('active');
    currentPosition = slideContainer.css('left');
    currentPositionNumber = currentPosition.split('px');
    newPosition = (currentPositionNumber[0] - 0) - slideWidth;
    slideContainer.animate({'left' : newPosition}, 2000);
    if(currentPosition === (-(slideWidth * slideAmount) + 'px')) {
      slideContainer.animate({'left' : (-slideWidth)}, 2000);
    }
  });

  thumbs.click(function(e){
    e.preventDefault();
    thumbs.removeClass('active');
    slide.removeClass('active');
    $(this).addClass('active');
    var thumbRel = $(this).attr('rel');
    $("."+thumbRel).each(function(i) {
      if ($(this).attr('data-slide') !== undefined) {
         $(this).addClass('active');
      }
    });
    thumbRel = $(this).attr('rel');
    thumbRelSplitter = thumbRel.split('slide');
    slideNumber = thumbRelSplitter[1];
    slideContainer.animate({'left' : (-slideNumber * slideWidth)}, 2000);
  });
};

carousel(('.carousel-container'));
