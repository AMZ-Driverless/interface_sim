const mongoose = require('mongoose');
const Commit = require('./server/models/Commit');

async function updateMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/amz_toy_dbe', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const latestCommits = require('./commits/latest_commits.json');

    for (const commit of latestCommits) {
      const existingCommit = await Commit.findOne({ commitId: commit.sha });

      if (!existingCommit) {
        const newCommit = new Commit({
          message: commit.commit.message,
          author: commit.commit.author.name,
          commitId: commit.sha
        });
        await newCommit.save();
        console.log(`Commit saved to MongoDB: ${commit.sha}`);
      }
    }

    console.log('MongoDB update complete');
  } catch (error) {
    console.error('Error updating MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateMongoDB();
