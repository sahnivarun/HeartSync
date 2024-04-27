const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5001;

// Configure CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Sequelize setup
const sequelize = new Sequelize('dating_application', '', '', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

// Define models
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  avatar: DataTypes.STRING,
  bio: DataTypes.TEXT
});

// Define models
const UserProfiles = sequelize.define('user_profiles', {
  age: DataTypes.STRING,
  status: DataTypes.STRING,
  sex: DataTypes.TEXT
});

const Like = sequelize.define('Like', {
  liked: DataTypes.BOOLEAN
});

const Match = sequelize.define('Match', {
  totalMatches: DataTypes.INTEGER
});

// Define associations
UserProfiles.belongsToMany(UserProfiles, { through: Like, as: 'Liker', foreignKey: 'userId' });
UserProfiles.belongsToMany(UserProfiles, { through: Like, as: 'Liked', foreignKey: 'likedUserId' });

app.get('/profiles', async (req, res) => {
  try {
    const profiles = await UserProfiles.findAll({
      where: {
        id: {
          [Sequelize.Op.ne]: 3 // Show only recommended profiles except for his/her own profile
        }
      }
    });
    console.log("profiles ", profiles);
    res.status(200).json({ profiles });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define routes
app.post('/like', async (req, res) => {
  const { userId, likedUserId, liked } = req.body;
  console.log("userId ", userId);
  console.log("likedUserId ", likedUserId);
  console.log("liked ", liked);
  try {
    await Like.create({ userId, likedUserId, liked });
    // await User.destroy({ where: { id: likedUserId } });
    res.status(200).json({ message: 'Like saved successfully' });
  } catch (error) {
    console.error('Error saving like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/dislike', async (req, res) => {
  const { userId, likedUserId, liked } = req.body;
  try {
    await Like.create({ userId, likedUserId, liked });
    // await User.destroy({ where: { id: likedUserId } });
    res.status(200).json({ message: 'Dislike saved successfully' });
  } catch (error) {
    console.error('Error saving dislike:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.error('Error syncing database:', error));
