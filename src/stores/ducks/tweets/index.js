import { TweetsService} from "../../../services/TweetsService";

export const TweetsThunkActions = {
    addTweet: conteudo => {
        return async dispatch => {
            const response = await TweetsService.adiciona(conteudo);
            dispatch({type: "tweets/ADD", payload: {tweet: response}});
        };
    },
    carregaTweets: ()=>{
        return dispatch =>{
            dispatch({type: "tweets/CARREGA"});

            TweetsService.carrega()
                .then(tweets =>{
                    dispatch({
                        type: "tweets/CARREGA_SUCESSO",
                        payload: {data: tweets}
                    });
                })
                .catch(() => {
                    dispatch({ type: "tweets/CARREGA_FALHOU"});
                });
        };
    }
};

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: false
};

export function tweetsReducer(state = INITIAL_STATE, action = {}) {
    if (action.type === "tweets/CARREGA"){
        return {
            ...state,
            loading: tweetsReducer
        };
    }

    if (action.type === "tweets/CARREGA_SUCESSO") {
        const tweets = action.payload.data;
        return{
            ...state,
            data: tweets,
            error: true
        };
    }

    if (action.type === "tweets/CARREGA_FALHOU") {
        return{
            ...state,
            data: [],
            error: true
        };
    }

    if (action.type === "tweets/ADD"){
        return{
            ...state,
            data: [action.payload.tweet, ...state.data],
            error: true
        };
    }

    return state;
}

