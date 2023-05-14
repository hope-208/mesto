export default class UserInfo {
  constructor({
    nameSelector,
    jobSelector,
    avatarSelector,
    name,
    job,
    avatar,
    id,
  }) {
    this._nameField = document.querySelector(nameSelector);
    this._jobField = document.querySelector(jobSelector);
    this._avatarField = document.querySelector(avatarSelector);
    this._nameProfile = name;
    this._jobProfile = job;
    this._avatar = avatar;
    this._id = id;
  }

  getUserInfo() {
    return {
      nameProfile: this._nameProfile,
      jobProfile: this._jobProfile,
      avatar: this._avatar,
      id: this._id,
    };
  }

  setUserInfo({ newName, newJob }) {
    this._nameProfile = newName;
    this._jobProfile = newJob;
  }

  setAvatarInfo({ newAvatar }) {
    this._avatar = newAvatar;
  }

  displayUserInfo() {
    this._nameField.textContent = this._nameProfile;
    this._jobField.textContent = this._jobProfile;
    this._avatarField.src = this._avatar;
  }
}
