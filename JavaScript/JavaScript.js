var hamburguer = document.querySelector(".hamburguer");

hamburguer.addEventListener("click", function () {
  document.querySelector(".container").classList.toggle("show-menu");
});

const campos = document.querySelectorAll("[required]");

function validatecampo(campo) {
  //logica para verificar se existe erros
  function verifyErrors() {
    let foundError = false;
    for (let error in campo.validity) {
      if (campo.validity[error] && !campo.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(typerError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "E-mail é obrigatório",
        typeMismatch: "Por favor, preencha um E-mail válido",
      },
    };

    return messages[campo.type][typerError];
  }
  function setCustomMessage(message) {
    const spanError = campo.parentNode.querySelector("span.error");
    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);
      campo.style.borderBottom = "solid";
      campo.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      campo.style.borderBottom = "solid";
      campo.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const campo = event.target;
  const validation = validatecampo(campo);

  validation();
}

for (campo of campos) {
  campo.addEventListener("invalid", (event) => {
    //Eliminar o bubble
    event.preventDefault();
    customValidation(event);
  });
  campo.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
