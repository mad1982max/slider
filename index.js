let deltaY = 0;
let deltaV = 1;
let initFloor = 'main_level_58.0';
let opacity = 0
let svg, group, floor, slider;
window.onload = function () {   
    let header = document.querySelector(".header");
    let footer = document.querySelector(".footer");
    let headerFooterHeight = header.offsetHeight + footer.offsetHeight;
    let wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //let wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let sliderHeight = wHeight - headerFooterHeight;

    document.body.style.opacity = 1; 
    svg = d3.select(document.querySelector('#svgObject').contentDocument.querySelector('#svgIn'));
    group = svg.select('.group')
    floor = group.select('.floor');
    floor.on('click', () => {
        if(opacity === 1) {
            console.log('click', d3.event.target.id)
        }
        
    })
    svg.on('wheel', onWheelFn);

    slider = document.querySelector('#slider');
    slider.addEventListener('change', onChangeSlider); 
    document.querySelector(".aside").style.height =  sliderHeight + "px"
}

function onChangeSlider(e) {
    console.log(this.value);
    deltaY = +this.value;
    group.attr('transform', `translate(0,${deltaY})`);
    checkHeight();
    console.log('sl', deltaY)
}


function onWheelFn(e) {
    deltaY = d3.event.deltaY > 0 ? deltaY + deltaV: deltaY - deltaV;
    if(deltaY < 0) deltaY=0;
    if(deltaY > 53) deltaY=53;

    console.log('wh', deltaY)
    group.attr('transform', `translate(0,${deltaY})`);
    checkHeight();

    slider.value = +deltaY


}

function checkHeight() {
    opacity = deltaY <= 0 ? 0 : 1;
    group
        .transition()
        .duration(200)
        .attr('opacity', opacity);

    let floorImg = currentFloor(deltaY);
    floor
        .attr('href', floorImg)
   
}

function currentFloor(currentHeight) {
    let floor;
    if(currentHeight <= 4) {
        floor = 'main_level_58.0'
    }
    else if (currentHeight > 4 && currentHeight <= 18) {
        floor = 'main_level_47.8'
    } else if (currentHeight > 18 && currentHeight <= 30) {
        floor = 'main_level_37.8'
    } else if (currentHeight > 30 && currentHeight <= 43) {
        floor = 'main_level_27.8'
    } else if (currentHeight > 43) {
        floor = 'main_level_22.8'
    }
    return `${floor}.png`
    }








function clickBack() {
    setTimeout(function () {
        document.location.href = `../index.html`
    }, 250);
}



function scrollFn(e) {
    console.log('scrool', e)
}

