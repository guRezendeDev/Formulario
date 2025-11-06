// Seletores
const usuario = document.querySelector('#usuario');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const confirmacaoSenha = document.querySelector('#confirmacao-senha');
const form = document.querySelector('#registro');
const toggleSenha = document.querySelector('#toggleSenha');
const toggleConfirmacaoSenha = document.querySelector('#toggleConfirmacaoSenha');

// Mostrar erro
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');
  const error = formField.querySelector('small');
  error.textContent = message;
};

// Mostrar sucesso
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove('error');
  formField.classList.add('success');
  const error = formField.querySelector('small');
  error.textContent = '';
};

// Validações auxiliares
const isRequired = value => value.trim() !== '';
const isBetween = (length, min, max) => length >= min && length <= max;
const isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
const isPasswordSecure = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return re.test(password);
};

// Validações de campos
const checkUsername = () => {
  const min = 3, max = 25;
  const usuarioVal = usuario.value.trim();
  if (!isRequired(usuarioVal)) {
    showError(usuario, 'Usuário não pode ficar em branco.');
    return false;
  } else if (!isBetween(usuarioVal.length, min, max)) {
    showError(usuario, `Usuário deve ter entre ${min} e ${max} caracteres.`);
    return false;
  } else {
    showSuccess(usuario);
    return true;
  }
};

const checkEmailField = () => {
  const emailVal = email.value.trim();
  if (!isRequired(emailVal)) {
    showError(email, 'E-mail não pode ficar em branco.');
    return false;
  } else if (!isEmailValid(emailVal)) {
    showError(email, 'E-mail inválido.');
    return false;
  } else {
    showSuccess(email);
    return true;
  }
};

const checkPasswordField = () => {
  const senhaVal = senha.value.trim();
  if (!isRequired(senhaVal)) {
    showError(senha, 'Senha não pode ficar em branco.');
    return false;
  } else if (!isPasswordSecure(senhaVal)) {
    showError(
      senha,
      'Senha deve ter no mínimo 8 caracteres, incluindo 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial (!@#$%^&*).'
    );
    return false;
  } else {
    showSuccess(senha);
    return true;
  }
};

const checkConfirmPasswordField = () => {
  const confirmacaoSenhaVal = confirmacaoSenha.value.trim();
  const senhaVal = senha.value.trim();
  if (!isRequired(confirmacaoSenhaVal)) {
    showError(confirmacaoSenha, 'Confirmação de senha é obrigatória.');
    return false;
  } else if (senhaVal !== confirmacaoSenhaVal) {
    showError(confirmacaoSenha, 'Senha e confirmação de senha são diferentes.');
    return false;
  } else {
    showSuccess(confirmacaoSenha);
    return true;
  }
};

// Mostrar/ocultar senha
toggleSenha.addEventListener("click", () => {
  const type = senha.getAttribute("type") === "password" ? "text" : "password";
  senha.setAttribute("type", type);
  toggleSenha.classList.toggle("bi-eye");
});

toggleConfirmacaoSenha.addEventListener("click", () => {
  const type = confirmacaoSenha.getAttribute("type") === "password" ? "text" : "password";
  confirmacaoSenha.setAttribute("type", type);
  toggleConfirmacaoSenha.classList.toggle("bi-eye");
});

// Submissão do formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isUserValid = checkUsername();
  const isEmailValid = checkEmailField();
  const isPasswordValid = checkPasswordField();
  const isConfirmValid = checkConfirmPasswordField();

  if (isUserValid && isEmailValid && isPasswordValid && isConfirmValid) {
    // Formulário válido: aqui você pode enviar ou redirecionar
    window.location.href = './index.html';
  }
});
