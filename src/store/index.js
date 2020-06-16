import { createStore } from 'redux';

const INITIAL_STATE = {
    watching: localStorage.getItem('watching') ? localStorage.getItem('watching').split(',') : [],
    toWatch: localStorage.getItem('toWatch') ? localStorage.getItem('toWatch').split(',') : [],
    ended: localStorage.getItem('ended') ? localStorage.getItem('ended').split(',') : [],
    edit: localStorage.getItem('edit') ? localStorage.getItem('edit').split(',') : [],

    watchingActive: true,
    toWatchActive: false,
    endedActive: false,
    editActive: false,
}

 
function reducer(state = INITIAL_STATE, action){
    if(action.type === 'REMOVE_ANIME'){
        console.log(state)
        switch (action.tipo){
            case 'watching':
                state.watching.splice(action.pos, 1);
                localStorage.setItem('watching', state.watching);               
                return { ...state, watching: state.watching};
            case 'toWatch':
                state.toWatch.splice(action.pos, 1);
                localStorage.setItem('toWatch', state.toWatch);
                return { ...state, toWatch: state.toWatch};
            case 'ended':
                state.ended.splice(action.pos, 1);
                localStorage.setItem('ended', state.ended);
                return { ...state, ended: state.ended};
            case 'edit':
                state.edit.splice(action.pos, 1);
                localStorage.setItem('edit', state.edit);
                return { ...state, edit: state.edit};

            default:
                return state
        }
    }
    if(action.type === 'ADD_ANIME'){
        switch (action.tipo){
            case 'watching':
                return { ...state, watching: [...state.watching, action.title]};
            case 'toWatch':
                return { ...state, toWatch: [...state.toWatch, action.title]};
            case 'ended':
                return { ...state, ended: [...state.ended, action.title]};
            case 'edit':
                return { ...state, edit: [...state.edit, action.title] };

            default:
                return state
        }
    }
    else if(action.type === 'SET_ACTIVE'){
        switch(action.tipo){
            case 'watching':
                return { 
                    ...state,
                    watchingActive: true, 
                    toWatchActive: false, 
                    endedActive: false,
                    editActive: false,
                };

            case 'toWatch':
                return { 
                    ...state, 
                    toWatchActive: true,
                    watchingActive: false, 
                    endedActive: false,
                    editActive: false, 
                };
            case 'ended':
                return { 
                    ...state, 
                    endedActive: true,
                    toWatchActive: false, 
                    watchingActive: false,
                    editActive: false,
                };
            case 'edit':
                return { 
                    ...state, 
                    endedActive: false,
                    toWatchActive: false, 
                    watchingActive: false,
                    editActive: true
                };
            default:
                return state;
        }
    }
    else{
        return state;
    }
}


const store = createStore(reducer);

export default store;