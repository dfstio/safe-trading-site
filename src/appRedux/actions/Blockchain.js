import {
      UPDATE_ADDRESS,
      UPDATE_VIRTUOSO_BALANCE,
      UPDATE_BALANCE,
      UPDATE_LBALANCE,
      UPDATE_SELL,
      UPDATE_BUY,
      UPDATE_VRT1,
      UPDATE_PUBLIC_KEY
} from "../../constants/Blockchain";



export function updateAddress(address) {
  return (dispatch) => {
    dispatch({type: UPDATE_ADDRESS, address});
  }
}

export function updateVirtuosoBalance(virtuosoBalance) {
  return (dispatch) => {
    dispatch({type: UPDATE_VIRTUOSO_BALANCE, virtuosoBalance});
  }
}

export function updateBalance(balance) {
  return (dispatch) => {
    dispatch({type: UPDATE_BALANCE, balance});
  }
}

export function updateLBalance(lbalance) {
  return (dispatch) => {
    dispatch({type: UPDATE_LBALANCE, lbalance});
  }
}

export function updateSell(sell) {
  return (dispatch) => {
    dispatch({type: UPDATE_SELL, sell});
  }
}

export function updateBuy(buy) {
  return (dispatch) => {
    dispatch({type: UPDATE_BUY, buy});
  }
}

export function updateVRT1(VRT1) {
  return (dispatch) => {
    dispatch({type: UPDATE_VRT1, VRT1});
  }
}

export function updatePublicKey(publicKey) {
  return (dispatch) => {
    dispatch({type: UPDATE_PUBLIC_KEY, publicKey});
  }
}
