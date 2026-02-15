
# 🚀 ModaFit Suplementos - Vitrine de Afiliados

Sua landing page premium de alta conversão para afiliados.

## 🛠️ Guia de Comandos Git (Treinamento)

Use estes comandos no terminal do VS Code para manter seu site atualizado:

### 1. Primeira vez (Setup)
```bash
# Iniciar o git na pasta
git init

# Adicionar todos os arquivos
git add .

# Criar o primeiro "ponto de salvamento"
git commit -m "feat: lançamento da vitrine premium"

# Conectar ao seu GitHub (Substitua o link abaixo pelo seu)
git remote add origin https://github.com/SEU_USUARIO/modafit-vitrine.git
git branch -M main

# Enviar para a nuvem
git push -u origin main
```

### 2. Rotina de Atualização (Quando você mudar um link ou preço)
```bash
# Adiciona as mudanças
git add .

# Descreve o que você mudou
git commit -m "fix: atualizado link do whey protein"

# Envia para o site (O Vercel atualizará o site sozinho!)
git push
```

## 🌐 Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
2. Clique em **"Add New" > "Project"**.
3. Selecione o repositório `modafit-vitrine`.
4. Em **Environment Variables**, adicione:
   - `API_KEY`: Sua chave do Gemini (obtida em ai.google.dev).
5. Clique em **Deploy**.

---
*Dica: Cada 'push' que você der no Git, o Vercel percebe e reconstrói seu site em segundos!*
