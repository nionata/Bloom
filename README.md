# Bloom
A hub for building and growing sustainable businesses. A CEN3031: Introduction to Software Engineering, client project.

[![Build Status](https://travis-ci.org/nionata/Bloom.svg?branch=master)](https://travis-ci.org/nionata/Bloom) ![Heroku](http://heroku-badge.herokuapp.com/?app=bizbloom&style=flat&svg=1)

## How to Contribute to Bloom
### Clone the project on your local machine
1. Navigate to a directory in your terminal
2. Clone the repository: 'git clone <clone_link>'
3. Install the project dependencies: 'npm install'
### Create your own working copy of the code (a new branch)
1. Open a terminal in the repository directory
2. Get the most current version of the code: 'git pull origin master'
3. Create a new branch for your changes: 'git branch <branch_name>' 
   * Make sure the branch name is indicative of the feauture or change you are making
4. Checkout the branch you just created: 'git checkout <branch_name>'
5. Push your new branch to GitHub: 'git push --set-upstream origin <branch_name>'
### Make changes
1. Open a terminal in the repository directory
2. Make sure you are on your branch: Execute 'git checkout <branch_name>'
3. Edit files, create files, delete files, etc
4. After each categorical change commit
   * git add -A 
   * git commit -m "Description of changes"
   * git push origin <branch_name>
### Adding your changes to master
1. Open a terminal in the repository directory
2. Make sure you are on the master branch: 'git checkout master'
3. Get the most current version of master: 'git pull origin master'
4. Move over to your branch: 'git checkout <branch_name>'
5. Merge the master branch into your branch: 'git merge master'
   * These first few steps ensure that any updates to the master branch work with your changes
6. If everything is working properly, push your branch to GitHub: 'git push origin <branch_name>'
7. Create a pull request on GitHub: Click 'New pull request'
   * Provide a good description of what changes you made
   * Submit your pull request
9. Wait for someone to review and approve your changes

## Team Members
* Parth Patel : Project Manager
* Nicholas Ionata : Scrum Master
* Cale Fitzwater
* Jake Meisenheimer
* Katherine Lee
