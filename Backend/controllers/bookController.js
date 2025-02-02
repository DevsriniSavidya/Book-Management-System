import Book from "../models/Book.js";

// Add New Book (Create)
export const addBook = async (req, res) => {
    const { title, author, genre, language, publishDate, description } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const book = new Book({ title, author, genre, language, publishDate, description, image, userId: req.user.id });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Get All Books (Read)
export const getBooks = async(req,res)=>{
    try{
        const books = await Book.find();
        res.json(books);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

//Get Books By User (Read)
export const getBooksByUser = async(req,res)=>{
    try{
        const books = await Book.find({userId: req.user.id});
        res.json(books);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

//Update Book Details(Update)
export const updateBook = async (req, res) => {
    try {

        const updateData = { ...req.body };

        // If there's a new image, update the image field in the database
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const book = await Book.findByIdAndUpdate(
            { _id: req.params.id, userId: req.user.id }, // Ensure only the owner can update
            { $set: updateData },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found or unauthorized" });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete Book (Delete)
export const deleteBook = async(req,res)=>{
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Book Deleted"})
    }catch(error){
        res.json({ message: error.message})
    }
}
