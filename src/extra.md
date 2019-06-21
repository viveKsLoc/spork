const albumSelectedAnimate = useSprings(
albums.length,
albums.map(al => ({
from: {
opacity: 0,
transform: "translate3d(0,-15px,0)",
display: "block"
},
to: {
opacity: albumSelected && al.id !== albumSelected ? 0 : 1,
transform: albumSelected && al.id !== albumSelected ? "translate3d(0,-200px,0)" : "translate3d(0,0px,0)",
display: albumSelected && al.id !== albumSelected ? "none" : "block"
}
}))
);
