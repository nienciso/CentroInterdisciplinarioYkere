const navbar = document.getElementById("navbarPrincipal");

function actualizarNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("navbar-scroll", window.scrollY > 35);
}

window.addEventListener("scroll", actualizarNavbar, { passive: true });
actualizarNavbar();

const elementosAnimados = document.querySelectorAll(".animar");

const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observer.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: "0px 0px -45px 0px"
});

elementosAnimados.forEach((elemento) => observer.observe(elemento));

const anioActual = document.getElementById("anioActual");
if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
}

const menuPrincipal = document.getElementById("menuPrincipal");
const enlacesMenu = document.querySelectorAll("#menuPrincipal .nav-link");

enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", () => {
        if (window.innerWidth < 992 && menuPrincipal) {
            const instancia = bootstrap.Collapse.getInstance(menuPrincipal);
            if (instancia) instancia.hide();
        }
    });
});

const secciones = document.querySelectorAll("main section[id]");
const linksNavbar = document.querySelectorAll(".navbar-nav .nav-link");

function actualizarSeccionActiva() {
    let actual = "inicio";

    secciones.forEach((seccion) => {
        const inicio = seccion.offsetTop - 190;
        const fin = inicio + seccion.offsetHeight;
        if (window.scrollY >= inicio && window.scrollY < fin) {
            actual = seccion.id;
        }
    });

    linksNavbar.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${actual}`);
    });
}

window.addEventListener("scroll", actualizarSeccionActiva, { passive: true });
actualizarSeccionActiva();

const decoracionesHero = document.querySelectorAll(".hero .decoracion");

window.addEventListener("mousemove", (evento) => {
    if (window.innerWidth < 992) return;

    const x = evento.clientX / window.innerWidth - 0.5;
    const y = evento.clientY / window.innerHeight - 0.5;

    decoracionesHero.forEach((elemento, indice) => {
        const intensidad = 2.5 + indice * 1.2;
        elemento.style.transform = `translate(${x * intensidad}px, ${y * intensidad}px)`;
    });
});
