import React, {useState} from 'react'

export const CheckoutForm = () =>{
        return (
          <div
            style={{
              padding: "3rem",
            }}
          >
            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <form
                style={{
                  display: "block",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="pay-button"
                  >
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      
}