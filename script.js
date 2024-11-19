const arr = [
    { name: 'Yellow Samurai', Image: 'https://i.pinimg.com/736x/fe/9b/01/fe9b01743704048bcb3d412b449d6a8e.jpg', link: 'img1.html' },
    { name: 'ben 10', Image: 'https://i.pinimg.com/564x/e0/f6/bc/e0f6bc2ae243410035ed38709fcac170.jpg', link: 'img2.html' },
    { name: 'ox', Image: 'https://i.pinimg.com/564x/ea/ee/c4/eaeec4438d6843b6ab79c733141148d7.jpg', link: 'img3.html' },
    { name: 'samurai snorlax', Image: 'https://i.pinimg.com/564x/28/57/05/2857059fae4e25c7e83c399b0dd22559.jpg', link: 'img4.html' },
    { name: 'samurai sketch', Image: 'https://i.pinimg.com/564x/91/14/f4/9114f468f6e967eacfdf2b1dd40d640d.jpg', link: 'img5.html' },
    { name: 'octopuss', Image: 'https://i.pinimg.com/736x/78/b7/a9/78b7a91c87e5ea1cd6561826f6311441.jpg', link: 'img6.html' },
    { name: 'dino rider', Image: 'https://i.pinimg.com/564x/13/bd/c8/13bdc88c0ee0beb652df6558a96e7d6a.jpg', link: 'img7.html' },
    { name: 'mushroom warrior', Image: 'https://i.pinimg.com/564x/06/22/78/062278f60bdfea3f5a4363f63d0952fc.jpg', link: 'img8.html' },
    { name: 'great panda', Image: 'https://i.pinimg.com/736x/6c/38/6b/6c386bb94a7b233ba4cb91c00fc50ed1.jpg', link: 'img9.html' },
    { name: 'muscle duck', Image: 'https://i.pinimg.com/564x/f5/6f/d7/f56fd710af162e131bf3d5c7a669b5ea.jpg', link: 'img10.html' },
    { name: 'spinosaurus', Image: 'https://i.pinimg.com/736x/76/86/55/7686559ebbe5cc0cc59f95ab15435040.jpg', link: 'img11.html' },
    { name: 'japani bhaisahab', Image: 'https://i.pinimg.com/564x/fe/c8/0b/fec80bf81f9ec9aa03c3df9747ec3c7b.jpg', link: 'img12.html' },
    { name: 'monkey d luffy', Image: 'https://i.pinimg.com/736x/13/0c/eb/130cebc34932a6b075c5fdc54b2222fc.jpg', link: 'img13.html' },
    { name: 'leopard', Image: 'https://i.pinimg.com/enabled_lo/564x/e4/dd/99/e4dd99f3b03999fc8fae4d3013974460.jpg', link: 'img14.html' },
    { name: 'banana spacecraft ', Image: 'https://i.pinimg.com/564x/7c/10/2d/7c102d757e2538f63becc8ee4e3d162e.jpg', link: 'img15.html' },
    { name: 'dont know', Image: 'https://i.pinimg.com/736x/01/43/1a/01431a51169d5b94a824135e85961b9e.jpg', link: 'img16.html' },
    { name: 'monkey man', Image: 'https://i.pinimg.com/enabled_lo/564x/f6/52/a9/f652a9a2d59e82846ce5c2049837e12f.jpg', link: 'img17.html' },
    { name: 'lakers', Image: 'https://i.pinimg.com/736x/7b/95/24/7b95240764630276549b148e49aaa3e6.jpg', link: 'img18.html' },
];

function display() {
    var clutter = '';
    arr.forEach((obj) => {
        clutter += `
        <div class="box">
            <a href="${obj.link}" target="">
                <img class="cursor-pointer" src="${obj.Image}" alt="${obj.name}" loading="lazy">
                <div class="save-btn" data-image="${obj.Image}" data-name="${obj.name}">Save</div>
                <div class="menu"><i class="ri-more-fill"></i></div>
            </a>
            <div class="caption">
                <h2>${obj.name}</h2>
            </div>
        </div>
        `;
    });
    document.querySelector('.container').innerHTML = clutter;
    gsap.from('.box', {
        duration: 0.5,   // duration of the animation
        opacity: 0,    // start with 0 opacity
        y: 50,         // move from 50px down
        stagger: 0.1,  // stagger the animation for each box
        ease: "power2.out" // easing for smooth animation

    });
    const savedButten = document.querySelectorAll('.save-btn');
    savedButten.forEach(button => {
        button.addEventListener('click', () =>{
            button.textContent = 'saved'
            button.style.backgroundColor = '#171717';
            const imageSrc = button.getAttribute('data-image');
            const name =  button.getAttribute('data-name');
            saveImageToProfile(imageSrc, name);
        })
    })
    function saveImageToProfile(imageSrc, name) {
        const savedPinContainer = document.querySelector('.saved-pins');
        const alreadysaved = Array.from(savedPinContainer.querySelectorAll('.img')).some(img => img.src === imageSrc);
        if (!alreadysaved) {
            const pin = document.createElement('div');
            pin.className = 'pin';
            pin.innerHTML = `<img src="${imageSrc}" alt="${name}">`;
            savedPinContainer.appendChild(pin);

            
        }
    }
}

display();

function searchfunction() {
    const input = document.querySelector('#searchinput');
    input.addEventListener("focus", function () {
        document.querySelector('.overlay').style.display = 'block';
    });
    input.addEventListener("blur", function () {
        document.querySelector('.overlay').style.display = 'none';
    });

    input.addEventListener("input", function () {
        let clutter = '';
        const filteredArr = arr.filter(obj => obj.name.toLowerCase().startsWith(input.value.toLowerCase()));

        filteredArr.forEach(obj => {
            clutter += `<div class="res flex px-8 py-3 cursor-pointer" data-link="${obj.link}">
                <i class="ri-search-line font-semibold mr-5"></i>
                <h3 class="font-semibold">${obj.name}</h3>
            </div>`;
        });

        document.querySelector('.searchdata').innerHTML = clutter;

        if (input.value) {
            document.querySelector('.searchdata').style.display = 'block';
            gsap.from('.res', {
                duration: 0.5,
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: "power2.out"
            });

            document.querySelectorAll('.res').forEach(item => {
                item.addEventListener('click', function () {
                    const link = this.getAttribute('data-link');
                    window.location.href = link;
                });
            });
        } else {
            document.querySelector('.searchdata').style.display = 'none';
        }
    });
}

searchfunction();
