import React,{useState} from 'react';
import Button from './button';
import Checkbox from './checkbox';
import '../App.css';


const Body=()=>{
    const [length, setLength] = useState(8);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);


  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    
    
    setTimeout(() => {
      setCopied(false);
     
    }, 2000);
  };
  const usePasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const generatePassword = (checkboxData, length) => {
      let charset = "",
        generatedPassword = "";
  
      const selectedOption = checkboxData.filter((checkbox) => checkbox.state);
  
      if (selectedOption.length === 0) {
        setErrorMessage("Select at least one option.");
        setPassword("");
        return;
      }
  
      selectedOption.forEach((option) => {
        switch (option.title) {
          case "Include Uppercase Letters":
            charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "Include Lowercase Letters":
            charset += "abcdefghijklmnopqrstuvwxyz";
            break;
          case "Include Numbers":
            charset += "0123456789";
            break;
          case "Include Symbols":
            charset += "!@#$%^&*()";
            break;
          default:
            break;
        }
      });
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }
  
      setPassword(generatedPassword);
     
      setErrorMessage("");
    };
  
    return { password, errorMessage, generatePassword };
  };
  

  const { password, errorMessage, generatePassword } = usePasswordGenerator();
    return(
            <div className="container">
            <h1>Password Generator</h1>
            
            <div className="charlength">
                <span>
                  <label>Character Length : </label>
                  <label>{length}</label>
                </span> 

                <input className='number'
                  type="number"
                  min="8"
                  max="50"
                  value={length}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value <= 50) {
                      setLength(value);
                    } else {
                      alert('Please enter a length less than or equal to 50.');
                    }
                }}
                />
              </div>
             
              {password && (
                <div className="header">
                  <div className="title">{password}</div>
                  <Button  customClass="copyBtn"
                    text={copied ? "Copied" : "copy"}
                    onClick={handleCopy}
                    
                  />
                </div>
              )}
              <div className="checkboxes">
                {checkboxData.map((checkbox, index) => {
                  return (
                    <Checkbox
                      key={index}
                      title={checkbox.title}
                      onChange={() => handleCheckboxChange(index)}
                      state={checkbox.state}
                    />
                  );
                })}
              </div>
              {errorMessage && <div className="errorMessage">{errorMessage}</div>}
              <b></b>
              <div>
              <Button
                text="Generate Password"
                onClick={() => generatePassword(checkboxData, length)}
                customClass="generateBtn"
              />
              </div>
            </div>
          );
    
}
export default Body;