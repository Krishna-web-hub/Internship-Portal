// backend/routes/internshipRoutes.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// We will add all our endpoint logic here...
// CREATE a new internship
router.post('/', async (req, res) => {
    try {
        const { title, description, companyId, duration, stipend } = req.body;

        // Basic validation
        if (!title || !description || !companyId) {
            return res.status(400).json({ error: "Title, description, and companyId are required." });
        }

        const newInternship = await prisma.internship.create({
            data: {
                title,
                description,
                companyId,
                duration,
                stipend,
            },
        });
        res.status(201).json(newInternship);
    } catch (error) {
        res.status(500).json({ error: "Failed to create internship." });
    }
});
// READ all internships
router.get('/', async (req, res) => {
    try {
        const internships = await prisma.internship.findMany({
            include: {
                company: { // Include the related company data
                    select: {
                        name: true // Only select the company's name
                    }
                }
            }
        });
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch internships." });
    }
});
// READ a single internship by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const internship = await prisma.internship.findUnique({
            where: { id: parseInt(id) },
            include: { company: true } // Include all company data
        });

        if (!internship) {
            return res.status(404).json({ error: "Internship not found." });
        }
        res.status(200).json(internship);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch internship." });
    }
});
// UPDATE an internship by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, duration, stipend } = req.body;

        const updatedInternship = await prisma.internship.update({
            where: { id: parseInt(id) },
            data: { title, description, duration, stipend },
        });
        res.status(200).json(updatedInternship);
    } catch (error) {
        res.status(500).json({ error: "Failed to update internship." });
    }
});
// DELETE an internship by ID
router.delete('/:id', isloggedIn, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.internship.delete({
            where: { id: parseInt(id) },
        });
        // 204 No Content is a standard success status for deletions
        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error :"Internship not found."})
        }
        res.status(500).json({ error: "Failed to delete internship." });
    }
});
module.exports = router;