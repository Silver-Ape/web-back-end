const Paper = require("../models/paper.model");
const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse");

//@desc    Create paper
//@route   POST /api/v1/paper/create
//@access  Private
exports.create = asyncHandler(async (req, res, next) => {

    const {name, author, abstract, image, pdf, topics, tag} = req.body;

    let authorIds = req.user.authors

    if(authorIds == null || authorIds == undefined){
        return next(new ErrorResponse('Please register as an author first', 400));
    }

    if(name == undefined || author == undefined || abstract == undefined || image == undefined || pdf == undefined || authorIds == undefined){
        return next(new ErrorResponse('Please provite all require field', 400));
    }

    const paper = new Paper({
        name: name,
        author: author,
        abstract: abstract,
        image: image,
        pdf: pdf,
        authorIds: authorIds,
        topics: topics,
        tag: tag == undefined? null : tag
    })

    Paper.create(paper, (err, data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 400));
        }
        res.status(200).send({"data": data})
    })

})


//@desc    Get papers
//@route   GET /api/v1/paper/papers
//@access  Public
exports.getPapers = asyncHandler(async(req, res, next) => {
    Paper.getPapers((err,data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })
})


//@desc    Get paper by id
//@route   GET /api/v1/paper/:id
//@access  Public
exports.getPaperById = asyncHandler(async(req, res, next) => {
    Paper.getPaperById(req.params.id, (err,data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })
})


//@desc    Wilcard paper search
//@route   GET /api/v1/paper/papers/search
//@access  Public
exports.getPapersWild = asyncHandler(async(req, res, next) => {
    const {val} = req.body

    Paper.weildSeach(val, (err,data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })
})


//@desc    Update paper info
//@route   PUT /api/v1/paper/papers/update
//@access  Private
exports.updatePaper = asyncHandler(async(req, res, next) => {

    const {name, author, abstract, image, pdf, topics, id, tag, authorIds} = req.body;
    if(id == undefined || name == undefined || authorIds ==undefined || author == undefined || abstract == undefined || image == undefined || pdf == undefined || authorIds == undefined || topics == undefined || tag == undefined){
        return next(new ErrorResponse('Please provite all require field', 400));
    }


    if(req.user.authors !== authorIds){
        return next(new ErrorResponse("Not authorized to edit this paper", 401));
    }

    const fields = {
        name: name,
        author: author,
        abstract: abstract,
        image: image,
        pdf: pdf,
        topics: topics,
        tag: tag
    }

    Paper.updatePaper(fields, id, (err,data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }
        res.status(200).send({"data": data})
    })

})


//@desc    Delete paper
//@route   DELETE /api/v1/paper/papers/delete
//@access  Private
exports.deletePaper = asyncHandler(async(req, res, next) => {

    const {id} = req.body;
    if(id == undefined ){
        return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
    }

    let paper;

    Paper.getPaperById(id, (err,data) => {
        if(err){
            return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
        }

        paper = JSON.stringify(data)
        if(JSON.parse(paper)[0].authorIds !== req.user.authors){
            return next(new ErrorResponse("Not authorized to edit this paper", 401));
        }

        Paper.deletePaper(id, (err, data) => {
            if(err){
                return next(new ErrorResponse(err.message || "Some error occured while createing paper", 500));
            }
            res.status(200).send({"data": data})
        })

    })

})
