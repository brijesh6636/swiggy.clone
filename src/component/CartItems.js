import React, { useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItemupdated, CheckItemCart } from "./ItemCart";
import { userSignin } from "../Const/UserSlice";
import PaymentPage from "../smallComponents/Paymentpage";
import OrderSucess from "../smallComponents/OrderSucess";
import { UserContext } from "../Const/UserContext";
import { app, firebaseConfig, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";
export const CartItems = () => {
  const { setItemSucess } = useContext(UserContext)

  const dispatch = useDispatch();
  const phoneNumber = useSelector((store) => store.User.user);
  const Cartwithbutton = CartItemupdated(CheckItemCart);
  const Citems = useSelector((store) => store.Cart.items);
  const inputPhoneRef = useRef(null);
  const verificationCodeRef = useRef(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [inputphonenumberbox, setinputphonenumberbox] = useState(false);
  const [verificationbox, setverificationbox] = useState(false);
  const [errormsgphone, seterrormsgphone] = useState(null);
  const [errormsgcode, seterrormsgcode] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [OrderSucessful, setOrderSucessful] = useState(false)

  let finalPrice = 0;
  Citems.forEach((cartItem) => {
    finalPrice += cartItem.card?.info?.price / 100 || cartItem.card?.info?.defaultPrice / 100;
  });
  const gstCharge = ((12 / 100) * finalPrice).toFixed(2);
  const finalPricewithgst = finalPrice + parseFloat(gstCharge);

  useEffect(() => {

    const auth = getAuth();
    const recaptchaContainer = document.getElementById("recaptcha-container");

    const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
      size: "invisible",
      callback: (response) => {
        console.log("captcha solved");
      }
    });

    setRecaptchaVerifier(recaptchaVerifier);

  }, []);

  useEffect(() => {
    setItemSucess(Citems)
  }, [Citems])
  const handleSignin = async () => {
    try {
      const auth = getAuth()
      const phoneNumber = inputPhoneRef.current.value;
      const appVerifier = recaptchaVerifier;

      // Using async/await for signInWithPhoneNumber
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log("Code sent successfully");
      setConfirmationResult(confirmationResult);
      setverificationbox(true);

      // Clear any previous error message
      if (errormsgphone !== null) {
        seterrormsgphone(null);
      }

      // Set processing state
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
      }, 3000);

    } catch (error) {
      // Handle any errors that occurred during the sign-in process
      console.log(error);
      seterrormsgphone(error);
    }
  };


  const handleVerification = () => {
    const code = verificationCodeRef.current.value;
    confirmationResult.confirm(code)
      .then((result) => {
        console.log("User signed in successfully.");
        const user = result.user;
        console.log(user.phoneNumber);
        dispatch(userSignin(user.phoneNumber));
        localStorage.setItem("swiggyuser", user.phoneNumber);
        if (errormsgcode !== null) {
          seterrormsgcode(null);
        }
        setProcessing(true);
        setTimeout(() => {
          setProcessing(false);
        }, 3000);
        setverificationbox(false)
      })
      .catch((error) => {
        console.log(error);
        seterrormsgcode("Invalid Code");
      });
  };

  return (
    <div className="flex flex-wrap justify-center px-24 py-8 bg-gray-200 min-h-screen">

      <div>
        {OrderSucessful ? <OrderSucess /> : Citems.length === 0 ? (
          <img className="w-1/2 h-4/5 ml-[300px] flex justify-center" src="https://th.bing.com/th/id/OIG4.1O6SqhU5y3pPbh108oqx?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Add to Cart" />
        ) : (
          <div>
            {Citems.map((cartItem, index) => (
              <div key={index}>
                <Cartwithbutton items={cartItem} />
              </div>
            ))}
          </div>
        )}
      </div>
      {Citems.length === 0 ? (
        <h1 className="text-xl font-semibold mt-8">Add something to Cart</h1>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-lg ml-6">
          <h3 className="text-xl font-bold mb-4">Bill details:</h3>
          <div className="flex flex-wrap border-b border-stone-950 text-base pb-3">
            <div className="flex-1">
              <p className="my-2">Items Total</p>
              <p className="my-2">Delivery Partner fee</p>
              <p className="my-2">GST and Restaurant Charges</p>
            </div>
            <div className="flex-1 text-right">
              <p className="my-2">₹{finalPrice}</p>
              <p className="text-green-600 my-2 font-semibold">FREE</p>
              <p className="my-2">₹{gstCharge}</p>
            </div>
          </div>
          <div className="flex flex-wrap text-xl font-bold mt-3 mb-4">
            <div className="flex-1"><p>To Pay</p></div>
            <div className="flex-1 text-right"><p>₹{finalPricewithgst}</p></div>
          </div>
          <button className="bg-green-600 rounded-lg text-white p-4 w-full font-semibold hover:bg-green-700 transition duration-200" onClick={() => { setinputphonenumberbox(true) }}>Place Order</button>   <br />
          {inputphonenumberbox === false ? null : (
            <div className="mt-4">
              {phoneNumber !== null ? <PaymentPage /> : (
                <>
                  <input ref={inputPhoneRef} placeholder="e.g +91 8050578803" className="border w-full rounded-lg border-gray-300 p-3 mb-2 focus:border-blue-500 focus:outline-none" /><br />
                  <p className="text-red-600 font-medium flex justify-center mb-2">{errormsgphone}</p>
                  <button className={`bg-green-600 w-full p-3 rounded-lg text-white font-semibold hover:bg-green-700 transition duration-200 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleSignin}>Login</button>    <br />
                </>
              )}
              {verificationbox === false ? null :
                <>
                  <input ref={verificationCodeRef} placeholder="Verification Code" className="border rounded-lg border-gray-300 w-full p-3 mb-2 mt-2 focus:border-blue-500 focus:outline-none" /><br />
                  <p className="text-red-600 font-medium flex justify-center mb-2">{errormsgcode}</p>
                  <button className={`bg-green-600 rounded-lg text-white w-full p-3 font-semibold hover:bg-green-700 transition duration-200 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleVerification}>Verify Code</button>
                </>
              }
            </div>
          )}

        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};
