
"use client";
import sanitizeHtml from 'sanitize-html';

//santize html before render to browser
export const SanitizeHTML = ({ html, options }) => {
    
    const defaultOptions = {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ], //allow defualt tags
        allowedAttributes: {
        'a': [ 'href' ] 
        },
        allowedIframeHostnames: []
    };
    
    const sanitize = (dirty, options) => ({
        __html: sanitizeHtml(
        dirty, 
        { ...defaultOptions, ...options }
        )
    });

   return  <span dangerouslySetInnerHTML={sanitize(html, options)} />
}
