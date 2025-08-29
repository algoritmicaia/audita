// useSectionsCollapse.ts
import { useReducer } from "react";

type Keys = "empresa"|"responsable"|"medicion"|"puntosMuestreo"|"conclusiones";
type State = Record<Keys, boolean>;
type Action = { type: "toggle", key: Keys } | { type: "expandAll" } | { type: "collapseAll" };

const initial: State = { empresa:false, responsable:true, medicion:true, puntosMuestreo:true, conclusiones:true };

function reducer(state: State, action: Action): State {
  switch(action.type){
    case "toggle": return { ...state, [action.key]: !state[action.key] };
    case "expandAll": return Object.fromEntries(Object.keys(state).map(k => [k,false])) as State;
    case "collapseAll": return Object.fromEntries(Object.keys(state).map(k => [k,true])) as State;
  }
}
export function useSectionsCollapse() {
  return useReducer(reducer, initial);
}
