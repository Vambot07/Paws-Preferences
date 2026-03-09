# ✨ How to Deploy a React App to GitHub Pages (Step-by-Step) ✨

Deploying a regular HTML website to GitHub Pages is easy—you just turn it on! 

**However**, because we built this app using **React** and **Vite**, GitHub doesn't actually understand our code out of the box. Our code has all sorts of special imports, components, and Tailwind logic that a normal web browser can't read directly. 

Before our website can go live, it has to be **"built"** (translated and bundled into plain HTML, CSS, and JS). 

Here is exactly what I did to automate that process for you step-by-step!

---

## 🛠️ Step 1: Update the Vite Config (`vite.config.js`)
When Vite builds your website, it assumes the website will live at the absolute "root" of a domain (like `www.mycoolapp.com/`). 

But GitHub Pages hosts your app inside a sub-folder using your repository name (like `https://vambot07.github.io/Paws-Preferences/`). 

If we don't tell Vite about this, it will try to find your images and CSS at the wrong URLs and your screen will be blank (or you'll get a **404 error**!).

**What I did:**
I went into your `vite.config.js` and added this exact line:
```javascript
base: '/Paws-Preferences/', 
```
This tells Vite: "Hey! When you build this app, make sure all the paths point inside the `/Paws-Preferences/` folder."

---

## 🤖 Step 2: Create a GitHub Actions Workflow (`deploy.yml`)
Because our code needs to be "built" before it can be shown to the world, we can't do the normal GitHub Pages setup. 

Instead, we have to tell GitHub to rent a tiny computer, download our code, run `npm run build` for us, and *then* publish the finished website. To do this, we use a robot tool called **GitHub Actions**.

**What I did:**
I created a special folder in your project called `.github/workflows/` and put a file inside it called `deploy.yml`. 

Whenever you push new code to your `main` branch, GitHub sees this file and automatically runs these exact steps in the cloud:
1. It downloads your code.
2. It runs `npm install` just like you do on your computer.
3. It runs `npm run build` to convert your React code into a real website.
4. It takes the finished `dist` folder and uploads it to GitHub Pages.

---

## 🎛️ Step 3: Turn it on in GitHub Settings (Wait for the green checkmark!)
Even though we pushed the code and the robot instructions, GitHub Pages is usually turned off by default. 

**What you need to do (or check):**
1. Go to your repository on GitHub (`Vambot07/Paws-Preferences`).
2. Click the **Settings** tab.
3. On the left side, click **Pages**.
4. Under the "Build and deployment" section, you'll see a source dropdown. Instead of choosing "Deploy from a branch", you must choose **GitHub Actions**.

Once you click that, GitHub wakes up the robot from **Step 2**. 

### 🛑 Why you got a 404 error:
When you push code, the GitHub robot takes about **1 to 2 minutes** to install Node.js and build your website. While the robot is working, the website at `https://vambot07.github.io/Paws-Preferences/` doesn't exist yet, which gives you a 404!

**How to track it:**
If you look at your GitHub repository online, click the **Actions** tab at the top. You will physically see the robot running your deployment. Once the yellow spinning circle turns into a **green checkmark**, your website is live and the 404 error will disappear!
