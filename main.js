// add click event listener for copyable text buttons
const copyableTextButtons = document.querySelectorAll(".copyable-text-button");
copyableTextButtons.forEach(button => {
    button.addEventListener("click", OnCopyableTextButtonClicked);
});

/**
 * Event handler function to respond to a copyable text button being clicked
 * This function will attempt to copy the text to the clipboard and display a successful icon and message if the copy operation was successful
 * and display a failure message and icon if it wasn't
 * This function is marked asynchronous because the clipboard is copied to inside the function and we await the Promise being returned
 */
async function OnCopyableTextButtonClicked(event) {
    // get the button that this event originated from
    const button = event.currentTarget;

    // if the button is disabled do nothing
    if (button.disabled) {
        return;
    }

    // immediately disable the button before continuing
    button.disabled = true;

    // get all important elements from the DOM tree
    const copyableTextBlock = button.closest(".copyable-text-block");
    const copyableTextSpan = copyableTextBlock.querySelector(".copyable-text");
    const copySuccessfulMsgSpan = copyableTextBlock.querySelector(".copy-successful-message");
    const copyFailureMsgSpan = copyableTextBlock.querySelector(".copy-failure-message");
    const clipboardIcon = button.querySelector(".clipboard-copy-icon");
    const copySuccessfulIcon = button.querySelector(".clipboard-check-icon");
    const copyFailureIcon = button.querySelector(".clipboard-x-icon");

    // make the clipboard icon transparent before making any other icons visible
    clipboardIcon.style.opacity = 0.0;

    // attempt to copy text to clipboard and modify the GUI based of off whether the copy operation succeeded or failed
    try {
        // attempt to copy text to user's clipboard, await the return of the promise
        await navigator.clipboard.writeText(copyableTextSpan.innerText);

        console.log("Successfully copied text: " + copyableTextSpan.innerText);

        // make successful message span and copy successful icon visible
        copySuccessfulMsgSpan.style.opacity = 1.0;
        copySuccessfulIcon.style.opacity = 1.0;
    } catch(err) {
        console.error("Failed to copy text: " + copyableTextSpan.innerText, "Failed with error: " + err);

        // make copy failure message span and copy failure icon visible 
        copyFailureMsgSpan.style.opacity = 1.0;
        copyFailureIcon.style.opacity = 1.0;
    }

    // wait 5 seconds before re-enabling the button and changing the copyable-text-block back to normal, so the user has time to see the GUI change
    setTimeout(() => {
        // make all successful and failure messages/icons transparent, it doesn't matter which ones are or aren't visible right now they all need to be
        // invisible after this point
        copySuccessfulMsgSpan.style.opacity = 0.0;
        copySuccessfulIcon.style.opacity = 0.0;
        copyFailureMsgSpan.style.opacity = 0.0;
        copyFailureIcon.style.opacity = 0.0;

        // make the clipboard icon visible after making other icons transparent
        clipboardIcon.style.opacity = 1.0;
        
        // re-enable the button after everything has been set back to normal
        button.disabled = false;
    }, 5000);
}
