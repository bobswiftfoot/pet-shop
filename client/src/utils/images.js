import axolotltreats from '../assets/images/axolotltreats.jpg';
import birdcage from '../assets/images/birdcage.jpg';
import birdfood from '../assets/images/birdfood.jpg';
import birdtoys from '../assets/images/birdtoys.jpg';
import birdtreats from '../assets/images/birdtreats.jpg';
import catfood from '../assets/images/catfood.jpg';
import cattower from '../assets/images/cattower.jpg';
import cattoy from '../assets/images/cattoy.jpg';
import cattreats from '../assets/images/cattreats.jpg';
import cattree from '../assets/images/cattree.jpg';
import dogfood from '../assets/images/dogfood.jpg';
import dogkennel from '../assets/images/dogkennel.jpg';
import dogtoy from '../assets/images/dogtoy.jpg';
import dogtreats from '../assets/images/dogtreats.jpg';
import elephantringtoss from '../assets/images/elephantringtoss.jpg';
import fishaquarium from '../assets/images/fishaquarium.jpg';
import fishfood from '../assets/images/fishfood.jpg';
import fishtank from '../assets/images/fishtank.jpg';
import fishtoy from '../assets/images/fishtoy.jpg';
import fishtreats from '../assets/images/fishtreats.jpg';
import giraffeenclosure from '../assets/images/giraffeenclosure.jpg';
import hampsterwheel from '../assets/images/hampsterwheel.jpg';
import kangaroofood from '../assets/images/kangaroofood.jpg';
import reptilefood from '../assets/images/reptilefood.jpg';
import reptileheatingpad from '../assets/images/reptileheatingpad.jpg';
import reptilehideaway from '../assets/images/reptilehideaway.jpg';
import reptiletreats from '../assets/images/reptiletreats.jpg';
import rodentfood from '../assets/images/rodentfood.jpg';
import rodenttreats from '../assets/images/rodenttreats.jpg';

const images =     
{
        axolotltreats: axolotltreats,
        birdcage: birdcage,
        birdfood: birdfood,
        birdtoys: birdtoys,
        birdtreats: birdtreats,
        catfood: catfood,
        cattower: cattower,
        cattoy: cattoy,
        cattreats: cattreats,
        cattree: cattree,
        dogfood: dogfood,
        dogkennel: dogkennel,
        dogtoy: dogtoy,
        dogtreats: dogtreats,
        elephantringtoss: elephantringtoss,
        fishaquarium: fishaquarium,
        fishfood: fishfood,
        fishtank: fishtank,
        fishtoy: fishtoy,
        fishtreats: fishtreats,
        giraffeenclosure: giraffeenclosure,
        hampsterwheel: hampsterwheel,
        kangaroofood: kangaroofood,
        reptilefood: reptilefood,
        reptileheatingpad: reptileheatingpad,
        reptilehideaway: reptilehideaway,
        reptiletreats: reptiletreats,
        rodentfood: rodentfood,
        rodenttreats: rodenttreats,
}

export function getImage(name)
{
    if(!name)
        return dogfood;

    const image = images[name.split('.')[0]];
    if(image)
        return image;
    return dogfood
}