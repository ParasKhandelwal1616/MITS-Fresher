import Video from '../models/Video.js';

export const getVideos = async(req, res) => {
    try {
        const videos = await Video.find({});
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVideo = async(req, res) => {
    const { title, url, description } = req.body;

    try {
        const video = new Video({
            title,
            url,
            description,
        });

        const createdVideo = await video.save();
        res.status(201).json(createdVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a video
// @route   PATCH /api/videos/:id
// @access  Admin
export const updateVideo = async(req, res) => {
    const { title, url, description } = req.body;

    try {
        const video = await Video.findById(req.params.id);

        if (video) {
            video.title = title || video.title;
            video.url = url || video.url;
            video.description = description || video.description;

            const updatedVideo = await video.save();
            res.json(updatedVideo);
        } else {
            res.status(404).json({ message: 'Video not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Admin
export const deleteVideo = async(req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (video) {
            await video.remove();
            res.json({ message: 'Video removed' });
        } else {
            res.status(404).json({ message: 'Video not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};