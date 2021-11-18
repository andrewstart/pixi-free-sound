import { setInstance } from './instance';
import { SoundLibrary } from './SoundLibrary';
import filters from './filters';
import webaudio from './webaudio';
import utils from './utils';

const sound = setInstance(new SoundLibrary());

export * from './Sound';
export * from './SoundLibrary';
export * from './Filterable';
export * from './interfaces';
export * from './filters/Filter';
export * from './SoundSprite';
export {
    sound,
    filters,
    webaudio,
    utils,
};
