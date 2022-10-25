/**
 * DROPLETS
 * @version: 3.2.9
 * @author: Ethan Lin
 * @updated on: 10-24-2022
 * @url: https://github.com/oel-mediateam/droplets-v3
 * @license: The MIT License (MIT)
 * @copyright: (c) 2018-2022 Learning Technology & Media, University of Wisconsin Extended Campus
 */

"use strict";

/*********************************************************
  GLOBAL (KICK-OFF)
  Call the waitForDroplets function to observe the loading
  of Droplets elements with the provided target Id, parent
  element, and the callback for the mutation observer.
**********************************************************/
window.Prism = window.Prism || {};
Prism.manual = true; 

const dropletsParam = {
    id: 'uws-droplets-page',
    parent: document.querySelector( '#main' ) ? document.querySelector( '#main' ) : document.querySelector( 'body' ),
    recursive: true,
    done: function () {
        runDropletsJs();
    }
};

if ( document.readyState != 'loading' ) {

    waitForDroplets( dropletsParam );

} else {

    document.addEventListener( 'DOMContentLoaded', function() {
        waitForDroplets( dropletsParam );
    } );

}

/*********************************************************
  MUTATION OBSERVER FUNCTION 
**********************************************************/

/**
 * Attach a mutation observer to observe that Droplets elements
 * are available.
 *
 * @function waitForDroplets
 * @since 3.0.0
 */
function waitForDroplets( params ) {   
    
    new MutationObserver( function() {

        const el = document.getElementById( params.id );
        
        if ( el ) {
            this.disconnect();
            params.done();
        }

    } ).observe( params.parent || document, {

        attributes: true,
        subtree: true,
        childList: true

    } );

    // trigger the observer to at least once detect a change in the DOM
    const el = document.querySelector( '#main' ) ? document.querySelector( '#main' ) : document.querySelector( 'body' );

    el.setAttribute( 'data-droplets', 'dropletjs-loaded' );

}

/*********************************************************
  MAIN DROPLETS FUNCTIONS
**********************************************************/

/**
 * Run the Droplets JS base on the browser URL
 * i.e., if it is on Canvas LMS or somewhere else.
 *
 * @function runDropletsJs
 * @since 3.0.0
 */
function runDropletsJs() {

     if ( isCanvasLms() ) {

        onCanvasLms();

     } else {

        // set droplets JS components
        checkDropletsComponents();

     }

}

/**
 * Check the browser URL to determine if it is
 * on Canvas LMS.
 *
 * @function isCanvasLms
 * @since 3.0.0
 */
function isCanvasLms() {

    if ( location.href.match( new RegExp( '.instructure.com/' ) ) ) {
        return true;
    }

    return false;

}

/**
 * Set and enable Droplets JavaScript components according
 * when the allowed domain is canvas/instructure.com.
 *
 * @function onCanvasLms
 * @since 3.0.0
 */
function onCanvasLms() {

    const dropletsPage = document.getElementById( 'uws-droplets-page' );
    
    if ( dropletsPage != undefined ) {
        
        // add canvas-net to indicate it is on Canvas LMS
        dropletsPage.classList.add( 'canvas-net' );
        
        // check to see if it is on an allowed page
        // add no-js class if not to expand any hidden contents
        if ( isAllowedCanvasPage() ) {
            checkDropletsComponents();
        } else {
            dropletsPage.classList.add( 'no-js' );
        }
        
    }

}

/**
 * Check to see if the page is a content page on Canvas
 * @function isAllowedCanvasPage
 * @param {Object} regex - a regular expression object.
 * @since 3.0.0
 * @return {boolean} true if matched, else false
 */
function isAllowedCanvasPage( ) {
    
    if ( location.pathname.match( /\/pages/ ) ) {
        return true;
    }
    
    return false;
    
}

/**
 * Checking the DOM to see if any Droplets components are used. If yes,
 * execute the function to set up the component. If not, ignore.
 * @function checkDropletsComponents
 * @since 2.0.0
 * @updated 3.0.0
 */
function checkDropletsComponents() {

    // set initial page container x and y as data- attributes
    const page = document.getElementById( 'uws-droplets-page' );

    // exit function if no-js class is set
    if ( page.classList.contains( 'no-js' ) ) {
        return;
    }

    // get the droplets content bounding position
    const pageBounding = page.getBoundingClientRect();
    
    page.setAttribute( 'data-x', pageBounding.x );
    page.setAttribute( 'data-y', pageBounding.y );
    
    // component elements
    const prefix = '#uws-droplets-page .droplets-';
    const toolTipSelector = document.querySelectorAll( prefix + 'tooltip' );
    const popoverSelector = document.querySelectorAll( prefix + 'popover' );
    const tabsSelector = document.querySelectorAll( prefix + 'tabs' );
    const tabbedSelector = document.querySelectorAll( prefix + 'tabbed' );
    const accordionsSelector = document.querySelectorAll( prefix + 'accordion' );
    const collapsibleSelector = document.querySelectorAll( prefix + 'collapsibles' );
    const showMoreSelector = document.querySelectorAll( prefix + 'readmore, ' + prefix + 'showmore' );
    const revealSelector = document.querySelectorAll( prefix + 'reveal' );
    const imgZoomSelector = document.querySelectorAll( prefix + 'image-zoom' );
    const resourcesSelector = document.querySelectorAll( prefix + 'resources' );
    const lighboxSelector = document.querySelectorAll( prefix + 'lightbox' );
    const annotationSelector = document.querySelectorAll( prefix + 'annotation' );
    const slideShowSelector = document.querySelectorAll( prefix + 'slideshow' );
    const speakSelector = document.querySelectorAll( prefix + 'speak' );
    const prismSelector = document.querySelectorAll( '#uws-droplets-page [class*=language-]' );
    
    // check for components
    if ( toolTipSelector.length ) {
        enableToolTips( toolTipSelector );
    }
    
    if ( popoverSelector.length ) {
        enablePopovers( popoverSelector );
    }

    if ( tabsSelector.length ) {
        enableTabs( tabsSelector );
    }

    if ( tabbedSelector.length ) {
        enableTabbed( tabbedSelector );
    }

    if ( accordionsSelector.length ) {
        enableAccordions( accordionsSelector );
    }

    if ( collapsibleSelector.length ) {
        enableCollapsibles( collapsibleSelector );
    }

    if ( showMoreSelector.length ) {
        enableShowMore( showMoreSelector );
    }

    if ( revealSelector.length ) {
        enableReveal( revealSelector );
    }

    if ( imgZoomSelector.length ) {
        enableImgZoom( imgZoomSelector );
    }
    
    if ( resourcesSelector.length ) {
        enableResources( resourcesSelector );
    }

    if ( lighboxSelector.length ) {
        enableLightbox( lighboxSelector );
    }

    if ( annotationSelector.length ) {
        enableAnnotation( annotationSelector );
    }

    if ( slideShowSelector.length ) {
        enableSlideshow( slideShowSelector );
    }

    if ( speakSelector.length ) {
        enableSpeak( speakSelector );
    }

    if ( prismSelector.length ) {
        Prism.highlightAllUnder( document.querySelector( '#uws-droplets-page' ), false );
    }

}

/**
 * Enable all tool tip elements.
 * @function enableToolTips
 * @param {Object[]} toolTips - Collection of tool tip elements.
 * @since 2.0.0
 */
function enableToolTips( toolTips ) {
    
    // loop through each tool tip elements to add mouse enter and leave
    // event listener to each tool tip element
    Array.prototype.forEach.call( toolTips, ( el ) => {
        
        el.addEventListener( 'mouseenter', function() {
            
            let tip = this.getAttribute( 'title' );
            let position = {
                left: this.offsetLeft,
                top: this.offsetTop,
                bottom: this.offsetTop - this.offsetHeight
            };
            let x = 0, y = 0;
            
            // create an attribute to hold the original tip
            el.setAttribute( 'data-tip', tip );
            
            // reset tip variable to data-tip attribute value
            tip = el.getAttribute( 'data-tip' );
            
            // create tool tip container with classes
            let toolTipNode = document.createElement( 'div' );
            
            toolTipNode.classList.add( 'tooltip' );
            
            let toolTipInnerNode = document.createElement( 'div' );
            
            toolTipInnerNode.classList.add( 'tooltip-inner' );
            toolTipInnerNode.innerHTML = tip;
            
            toolTipNode.appendChild( toolTipInnerNode );
            
            // add the tool tip container to the DOM
            this.insertBefore( toolTipNode, this.firstChild );
			
            // determine tooltip display positions
            if ( this.classList.contains( 'top' ) ) {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            } else if ( this.classList.contains( 'bottom' ) ) {
                x = position.top + toolTipNode.offsetHeight - 10;
                y = position.left;
            } else if ( this.classList.contains( 'right' ) ) {
                x = position.top;
                y = position.left + this.offsetWidth + 5;
            } else if ( this.classList.contains( 'left' ) ) {
                x = position.top;
                y = position.left - toolTipNode.offsetWidth - 5;
            } else {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            }
			
            // set tool tip position
            toolTipNode.style.top = x + 'px';
            toolTipNode.style.left = y + 'px';
            
            // remove title attribute
            this.removeAttribute( 'title' );
            
            // add mouse leave event to remove the tool tip container from DOM
            this.addEventListener( "mouseleave", function() {
            
                if ( toolTipNode.parentNode !== null ) {
                    toolTipNode.parentNode.removeChild(toolTipNode);
                }
                
                // add title attribute back
                this.setAttribute( 'title', tip );
            
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all popover elements.
 * @function enablePopovers
 * @param {Object[]} popovers - Collection of pop over elements.
 * @since 2.0.0
 */
function enablePopovers( popovers ) {
    
    // loop through each popovers
    Array.prototype.forEach.call( popovers, ( el ) => {
        
        let title = '';
        
        // if data-title attribute is specified
        if ( el.getAttribute( 'data-title' ) !== null ) {
            
            // set the title to data-title value
            title = el.getAttribute( 'data-title' );
            
        } else {
            
            // set title to the title attribute
            title = el.getAttribute( 'title' )
            
            // create data-title to hold the original title attribute value
            el.setAttribute( 'data-title', title );
            
            // reset the title variable to data-title instead
            title = el.getAttribute( 'data-title' );
            
        }
        
        // create the popover container
        let popoverDiv = document.createElement( 'div' );
                
        popoverDiv.classList.add( 'popover' );
        popoverDiv.setAttribute( 'role', 'tooltip' );
        
        let popoverContentDiv = document.createElement( 'div' );
        
        popoverContentDiv.classList.add( 'popover-content' );
        popoverContentDiv.innerHTML = title;
        
        popoverDiv.appendChild( popoverContentDiv );
        
        // add the popover container to the DOM
        el.insertBefore( popoverDiv, el.firstChild );
        
        // add the click event listener
        el.addEventListener( 'click', function() {
            
            // if visible
            if ( this.querySelector( '.popover' ).style.display === 'block' ) {
                
                // hide
                this.querySelector( '.popover' ).style.display = 'none';
                this.classList.remove( 'active' );
                
            } else {
                
                // else show
                this.classList.add( 'active' );
                popoverDiv.style.display = 'block';
                
                // and determine popover positions
                let x = 0, y = 0;
                let horzCenter = this.offsetWidth - ( ( popoverDiv.offsetWidth + this.offsetWidth ) / 2 );
                let vertzCenter = this.offsetHeight - ( ( popoverDiv.offsetHeight + this.offsetHeight ) / 2 );
                
                if ( this.classList.contains( 'top' ) ) {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( 'bottom' ) ) {
                    
                    popoverDiv.classList.add( 'bottom' );
                    x = this.offsetHeight + 10;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( 'right' ) ) {
                    
                    popoverDiv.classList.add( 'right' );
                    x = vertzCenter;
                    y = this.offsetWidth + 10;
                    
                } else if ( this.classList.contains( 'left' ) ) {
                    
                    popoverDiv.classList.add( 'left' );
                    x = vertzCenter;
                    y = ( popoverDiv.offsetWidth + 10 ) * -1;
                    
                } else {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                }
                
                // position the popover on the DOM
                popoverDiv.style.top = x + 'px';
                popoverDiv.style.left = y + 'px';
                
            }
            
        } );
        
        // add mouse enter event to remove the title attribute
        // to prevent default tooltip behavior and add back in on mouse leave
        el.addEventListener( 'mouseenter', function() {
            
            this.removeAttribute( 'title' );
            
            this.addEventListener( 'mouseleave', function() {
            
                this.setAttribute( 'title', title );
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all (new way) tab elements.
 * @function enableTabbed
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 3.0.0
 */
function enableTabbed( tabs ) {

    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {

        let activeSet = false;
        
        // set each tab element's tabs and sections
        const tabBtns = tabWrapper.querySelectorAll( '.tab' );
        const tabContents = tabWrapper.querySelectorAll( '.content' );

        // set screen reader attributes for each tab component
        tabWrapper.setAttribute( 'role', 'rolelist');
        tabWrapper.setAttribute( 'aria-multiselectable', 'false' );

        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // if current tab contains active class and activeSet
            // is false, set activeSet to true
            // else remove duplicate active class
            if ( tab.classList.contains( 'active' ) && activeSet === false ) {
                activeSet = true;
            } else {
                tab.classList.remove( 'active' );
            }

            // set screen reader attributes for each tab
            tab.setAttribute( 'role', 'tab' );
            tabContents[i].setAttribute( 'role', 'tabpanel' );

            if ( tab.id ) {
                tab.setAttribute( 'id', tab.id );
                tab.setAttribute( 'aria-controls', tab.id + '-content' );
                tabContents[i].setAttribute( 'id', tab.id + '-content' );
                tabContents[i].setAttribute( 'aria-labelledby', tab.id );
            }

            // set tab selected state
            changeTabState( tab, tabContents[i], tab.classList.contains( 'active' ) );
            
            // add event listener to each tab
            tab.addEventListener( 'click', function() {
                
                // if not selected...
                if ( !this.classList.contains( 'active' ) ) {

                    // change all tabs to inactive first
                    Array.prototype.forEach.call( tabBtns, function( el, i ) {
                        changeTabState( el, tabContents[i], false );
                    } );
                    
                    // change selected tab to active
                    changeTabState( this, tabContents[i], true );

                }
                
            } );
            
        } );

        // if there is no active class in tabs, 
        // set first one active
        if ( activeSet === false ) {
            changeTabState( tabBtns[0], tabContents[0], true );
            activeSet = true;
        }
        
    } );
    
}

/**
 * Helper function to change the state of the tabs.
 * @function changeTabState
 * @param {Object} tab - the tab button.
 * @param {Object} content - the tab content.
 * @param {Boolean} active - the state of the tab.
 * @since 3.0.0
 */
function changeTabState( tab, content, active ) {

    // set tab selected state
    if ( active ) {
        tab.classList.add( 'active' );
        tab.setAttribute( 'aria-selected', 'true');
        content.classList.add( 'active' );
    } else {
        tab.classList.remove( 'active' );
        tab.setAttribute( 'aria-selected', 'false');
        content.classList.remove( 'active' );
    }

}

/**
 * Enable all (new way) accordion/collapsible elements.
 * @function enableCollapsibles
 * @param {Object[]} collapsibles - Collection of tab elements.
 * @since 3.0.0
 */
function enableCollapsibles( collapsibles ) {
    
    // loop through collection of collapsible elements
    Array.prototype.forEach.call( collapsibles, function( collapsiblesWrapper ) {
        
        // set each collapsible element's section and content
        const sections = collapsiblesWrapper.querySelectorAll( '.section' );
        const contents = collapsiblesWrapper.querySelectorAll( '.content' );

        // set screen reader attributes for each collapsible components
        collapsiblesWrapper.setAttribute( 'role', 'rolelist');
        collapsiblesWrapper.setAttribute( 'aria-multiselectable', 'true' );

        // for each section of current collapsible element iternation
        Array.prototype.forEach.call( sections, function( section, i ) {
            
            // set screen reader attributes for each collapsible section
            section.setAttribute( 'role', 'tab' );
            contents[i].setAttribute( 'role', 'tabpanel' );

            if ( section.id ) {
                section.setAttribute( 'id', section.id );
                section.setAttribute( 'aria-controls', section.id + '-content' );
                contents[i].setAttribute( 'id', section.id + '-content' );
                contents[i].setAttribute( 'aria-labelledby', section.id );
            }

            // set section selected state
            if ( section.classList.contains( 'active' ) ) {
                section.setAttribute( 'aria-expanded', 'true' );
                contents[i].classList.add( 'active' );
            } else {
                section.setAttribute( 'aria-expanded', 'false' );
            }
            
            // add event listener to each section
            section.addEventListener( 'click', function() {
                
                // if opened
                if ( this.classList.contains( 'active' ) ) {
                    
                    // close it
                    toggleSection( this, contents[i], false );

                } else {

                    // open it
                    toggleSection( this, contents[i], true );
                    
                }  
                
            } );
            
        } );

        // create the accordion controls for each accordion
        const controlsWrapper = document.createElement( 'div' );
        controlsWrapper.classList.add( 'controls' );
        
        const closeBtn = document.createElement( 'a' );
        closeBtn.classList.add( 'cbtn', 'closeAll' );
        closeBtn.setAttribute( 'role', 'button' );
        closeBtn.innerHTML = 'Close All';
        closeBtn.href = '';
        
        const openBtn = document.createElement( 'a' );
        openBtn.classList.add( 'cbtn', 'openAll' );
        openBtn.setAttribute( 'role', 'button' );
        openBtn.innerHTML = 'Open All';
        openBtn.href = '';
        
        controlsWrapper.appendChild( closeBtn );
        controlsWrapper.appendChild( openBtn );

        collapsiblesWrapper.insertBefore( controlsWrapper, collapsiblesWrapper.firstChild );

        closeBtn.addEventListener( 'click', (evt) => {
            
            Array.prototype.forEach.call( sections, function(section, i) {
                toggleSection( section, contents[i], false );
            } );
            
            // prevent default event action
            evt.preventDefault();

        } );

        openBtn.addEventListener( 'click', (evt) => {
            
            Array.prototype.forEach.call( sections, function(section, i) {
                toggleSection( section, contents[i], true );
            } );
            
            // prevent default event action
            evt.preventDefault();

        } );
        
    } );
    
}

/**
 * Helper function to toggle the state of the collapsibles.
 * @function toggleSection
 * @param {Object} section - the section label button.
 * @param {Object} content - the section content.
 * @param {Boolean} isClosed - is closed flag.
 * @since 3.0.0
 */
function toggleSection( section, content, isClosed ) {

    if ( isClosed ) {

        section.classList.add( 'active' );
        section.setAttribute( 'aria-expanded', 'true' );
        content.classList.add( 'active' );

    } else {

        section.classList.remove( 'active' );
        section.setAttribute( 'aria-expanded', 'false' );
        content.classList.remove( 'active' );

    }

}

/**
 * Enable all show more elements.
 * @function enableShowMore
 * @param {Object[]} showMore - Collection of show more elements.
 * @since 3.0.0
 */
function enableShowMore( showMore ) {
    
    // loop through collection of read more elements
    Array.prototype.forEach.call( showMore, function( el ) {
        
        // create the show more control
        const showMoreCntrl = document.createElement( 'div' );
        
        showMoreCntrl.classList.add( 'droplets-showmore-cntrl' );
        showMoreCntrl.setAttribute( 'aria-hidden', 'true' );
        showMoreCntrl.appendChild( document.createTextNode( 'Show More' ) );
        
        // add the show more control to the DOM
        el.insertAdjacentElement( 'afterend', showMoreCntrl );
        
        // on click event lisitener
        showMoreCntrl.addEventListener( 'click', function() {

            if ( el.classList.contains( 'expanded' ) ) {
                
                el.classList.remove( 'expanded' );
                this.innerHTML = 'Show More';
                this.classList.remove( 'expanded' );
                
            } else {
                
                el.classList.add( 'expanded' );
                this.innerHTML = 'Show Less';
                this.classList.add( 'expanded' );
                
            }
            
        } );
        
    } );
    
}

/**
 * Enable all reveal elements.
 * @function enableReveal
 * @param {Object[]} reveals - Collection of reveal elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableReveal( reveals ) {
    
    // loop through collection of reveal elements
    Array.prototype.forEach.call( reveals, function( el ) {
        
        // create a toggle button
        const toggleBtn = document.createElement( 'button' );
        
        toggleBtn.classList.add( 'droplets-reveal-btn' );
        toggleBtn.setAttribute( 'aria-hidden', 'true' );
        toggleBtn.innerHTML = getRevealBtnName( el );

        // add the toggle button to the DOM
        el.insertAdjacentElement( 'afterend', toggleBtn );
        
        // show/hide hidden content on click
        toggleBtn.addEventListener( 'click', function() {
            
            if ( el.classList.contains( 'revealed' ) ) {
                
                el.classList.remove( 'revealed' );
                this.classList.remove( 'revealed' );
                this.innerHTML = getRevealBtnName( el );
                
            } else {
                
                el.classList.add( 'revealed' );
                this.classList.add( 'revealed' );
                this.innerHTML = 'Hide';
                
            }
            
        } );
        
    } );
    
}

/**
 * Reveal component helper function to get the button name.
 * @function getRevealBtnName
 * @param {Object} el - a reveal DOM object.
 * @return {String}
 * @since 3.0.0
 */
function getRevealBtnName( el ) {
    
    if ( !isEmpty( el.getAttribute( 'data-button-name' ) ) ) {
        return el.getAttribute( 'data-button-name' );
    }

    return 'Show';

}

/**
 * Enable all image zoom elements.
 * @function enableImgZoom
 * @param {Object[]} imgZooms - Collection of image zoom elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableImgZoom( imgZooms ) {
    
    // loop through collection of image zoom elements
    Array.prototype.forEach.call( imgZooms, function( el ) {
        
        // get sibiling image src
        const img = el.querySelector( 'img' );

        // set original image width and height
        const orgImg = new Image();
        orgImg.src = img.src;
        orgImg.onload = () => {
            img.setAttribute( 'data-width', orgImg.width );
            img.setAttribute( 'data-height', orgImg.height );
        };
        
        // create magnified container
        const magnifyDiv = document.createElement( 'div' );
        
        magnifyDiv.classList.add( 'magnify' );
        magnifyDiv.style.backgroundImage = 'url(\"' + img.src + '\")';
        
        // add the magnify div to the DOM
        el.appendChild( magnifyDiv );
        
        // show manified version on mousemove over image
        el.addEventListener( 'mousemove', function( evt ) {

            // get original image width and height
            const nativeWidth = img.getAttribute( 'data-width' );
            const nativeHeight = img.getAttribute( 'data-height' );
            
            // get positions
            const page = document.getElementById( 'uws-droplets-page' );
            const pageX = Number( page.getAttribute( 'data-x' ) );
            const pageY = Number( page.getAttribute( 'data-y' ) );
            const magnifyX = evt.pageX - pageX - this.offsetLeft;
            const magnifyY = evt.pageY - pageY - this.offsetTop;

            // show / hide magnified image
            if ( magnifyX < this.offsetWidth && magnifyY < this.offsetHeight 
                 && magnifyX > 0 && magnifyY > 0 ) {
                 
                magnifyDiv.classList.add( 'show' );
                 
                const rx = Math.round( magnifyX / img.offsetWidth * nativeWidth - magnifyDiv.offsetWidth / 2 ) * -1;
                const ry = Math.round( magnifyY / img.offsetHeight * nativeHeight - magnifyDiv.offsetHeight / 2 ) * -1;
                
                magnifyDiv.style.left = ( magnifyX - magnifyDiv.offsetWidth / 2 ) + 'px';
                magnifyDiv.style.top = ( magnifyY - magnifyDiv.offsetHeight / 2 ) + 'px';
                
                if ( rx != 100 && ry != 100 ) {
                    magnifyDiv.style.backgroundPosition = rx + 'px ' + ry + 'px';
                }
                 
            } else {
                
                magnifyDiv.classList.remove( 'show' );
                
            }
            
        } );
        
    } );
    
}

/**
 * Enable all lightbox elements.
 * @function enableLightbox
 * @param {Object[]} lightboxes - Collection of lightbox elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableLightbox( lightboxes ) {

    // get page element
    const page = document.getElementById( 'uws-droplets-page' );
    
    // create overlay element and its controls
    const overlayDiv = document.createElement( 'div' );
    
    overlayDiv.classList.add( 'droplets-lightbox-overlay' );
    overlayDiv.setAttribute( 'aria-hidden', 'true' );
    
    const contentDiv = document.createElement( 'div' );
    
    contentDiv.classList.add( 'overlay-content' );
    
    const closeOverlayBtn = document.createElement( 'a' );
    
    closeOverlayBtn.classList.add( 'overlay-close-btn' );
    closeOverlayBtn.setAttribute( 'role', 'button' );
    
    // create left and right arrows
    const leftArrow = document.createElement( 'a' );
    
    leftArrow.classList.add( 'overlay-left-arrow' );
    leftArrow.setAttribute( 'role', 'button' );
    
    const rightArrow = document.createElement( 'a' );
    
    rightArrow.classList.add( 'overlay-right-arrow' );
    rightArrow.setAttribute( 'role', 'button' );
    
    // add them all to the overlay div
    overlayDiv.appendChild( leftArrow );
    overlayDiv.appendChild( rightArrow );
    overlayDiv.appendChild( closeOverlayBtn );
    overlayDiv.appendChild( contentDiv );
    
    // add overlay element to DOM
    page.appendChild( overlayDiv );
    
    // event listeners to close overlay
    overlayDiv.addEventListener( 'click', function( evt ) {
                
        if ( evt.target === this ) {
            
            if ( overlayDiv.classList.contains( 'show-overlay' ) ) {
            
                overlayDiv.classList.remove( 'show-overlay' );
                overlayDiv.querySelectorAll( '.overlay-content' )[0].innerHTML = '';
                
            } 
            
        }
        
    } );
    
    closeOverlayBtn.addEventListener( 'click', function() {
                
        if ( overlayDiv.classList.contains( 'show-overlay' ) ) {
            
            overlayDiv.classList.remove( 'show-overlay' );
            overlayDiv.querySelectorAll( '.overlay-content' )[0].innerHTML = '';
            
        } 
        
    } );
    
    // loop through collection of image zoom elements to show the selected image
    Array.prototype.forEach.call( lightboxes, function( lightbox ) {
        
        const imgFigSelector = lightbox.querySelectorAll( 'img, figure' );
        
        // check to see if there is mixed of img and figure
        // if true, show error and exit main loop
        if ( isImgFigCombo( imgFigSelector ) ) {
            
            const err = document.createElement( 'div' );
            err.classList.add( 'callout', 'danger', 'lightbox-error' );
            
            let msg = document.createElement( 'p' );
            msg.innerHTML = '<strong>Error:</strong> Do not mix img and figure tags.';
            
            err.appendChild( msg );
            lightbox.appendChild( err );
            
            return;
            
        }
        
        // determind which element is used
        const imgSelector = lightbox.querySelectorAll( 'img' );
        const figSelector = lightbox.querySelectorAll( 'figure' );
        let targetSelector = figSelector;
        
        if ( figSelector.length === 0 ) {
            targetSelector = imgSelector;
        }
        
        // loop throug the elements to add event listeners
        Array.prototype.forEach.call( targetSelector, function( img, index ) {
            
            let currentIndex = 0;
            
            img.addEventListener( 'click', function( evt ) {
                
                // add event listener to left and right button if more than 1
                if ( targetSelector.length > 1 ) {
                    
                    rightArrow.style.display = 'inherit';
                    
                    rightArrow.addEventListener( 'click', function ( evt ) {
                        
                        currentIndex++;
                        
                        if ( currentIndex > targetSelector.length - 1 ) {
                            
                            currentIndex = 0;
                            
                        }
                        
                        selectImage( targetSelector[currentIndex], contentDiv );
                        evt.preventDefault();
                        
                    } );
                    
                    leftArrow.style.display = 'inherit';
                    
                    leftArrow.addEventListener( 'click', function ( evt ) {
                        
                        currentIndex--;
                        
                        if ( currentIndex < 0 ) {
                            
                            currentIndex = targetSelector.length - 1;
                            
                        }
                        
                        selectImage( targetSelector[currentIndex], contentDiv );
                        
                        evt.preventDefault();
                        
                    } );
                    
                } else {
                    
                    rightArrow.style.display = 'none';
                    rightArrow.removeEventListener( 'click', function() {} );
                    
                    leftArrow.style.display = 'none';
                    leftArrow.removeEventListener( 'click', function() {} );
                    
                }
                
                selectImage( img, contentDiv )
                overlayDiv.classList.add( 'show-overlay' );
                currentIndex = index;
                evt.preventDefault();
                
            } );
            
        } );
        
    } );
    
}

/**
 * Check to see if the lightbox is mixed of img and figure tag
 * @function isImgFigCombo
 * @param {Object[]} selectiors - Collection of img or figure elements.
 * @since 2.0.0
 */
function isImgFigCombo( selectors ) {
    
    let img = 0;
    let fig = 0;
    
    Array.prototype.forEach.call( selectors, function( el ) {
        
        if ( el.nodeName === 'IMG' ) {
            img++;
        } else if ( el.nodeName === 'FIGURE' ) {
            fig++;
        }
            
    } );
    
    if ( img >= 1 && fig >= 1 && img > fig ) {
        return true;
    }
    
    return false;
    
}

/**
 * Select and display the full lightbox image
 * @function selectImage
 * @param {Object} img - img or figure element.
 * @param {Object} img - container to append img element.
 * @since 2.0.0
 */
function selectImage( img, contentDiv ) {
    
    contentDiv.innerHTML = '';
                
    const fullImg = document.createElement( 'img' );
    const caption = document.createElement( 'p' );
    
    if ( img.nodeName === 'IMG' ) {
        
        fullImg.src = img.src;
        caption.classList.add( 'caption' );
        caption.innerHTML = img.getAttribute( 'alt' );
        
    } else if ( img.nodeName === 'FIGURE' ) {
        
        const innerImg = img.querySelector( 'img' );
        const figcaption = img.querySelector( 'figcaption' );
        
        fullImg.src = innerImg.src;
        caption.classList.add( 'caption' );

        if ( figcaption ) {
            caption.innerHTML = figcaption.innerHTML;
        } else {
            caption.innerHTML = innerImg.getAttribute( 'alt' );
        }
        
    }

    contentDiv.appendChild( fullImg );
    contentDiv.appendChild( caption );
    
}

/**
 * Enable all resource elements.
 * @function enableResources
 * @param {Object[]} resources - Collection of resource elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableResources( resources ) {
    
    // loop through collection of resource elements
    Array.prototype.forEach.call( resources, function( resourcesWrapper ) {
        
        // get the resource class selector
        const resourceItems = resourcesWrapper.querySelectorAll( '.resource' );
        
        // loop through each resouces
        Array.prototype.forEach.call( resourceItems, function( resource ) {
            
            // get the cover info selector
            const coverEl = resource.querySelectorAll( '.cover-info' );
            
            // loop through the cover info of each resource
            // There is only 1 element in the array (NodeList) because there is
            // only 1 cover info per resource
            Array.prototype.forEach.call( coverEl, function( el ) {
                
                // create arrow element
                const arrow = document.createElement( 'div' );
                arrow.classList.add( 'arrow' );
                
                // add the arrow next to the cover info
                el.parentNode.insertBefore( arrow, el.nextSibling );
                
                // add event listener to the arrow to toggle the resource
                arrow.addEventListener( 'click', function() {
                    
                    if ( this.parentNode.classList.contains( 'expanded' ) ) {
                        this.parentNode.classList.remove( 'expanded' );
                    } else {
                        this.parentNode.classList.add( 'expanded' );
                    }
                    
                } );
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all annotation component.
 * @function enableAnnotation
 * @param {Object[]} annotations - Collection of annotation elements.
 * @since 3.1.0
 */
function enableAnnotation( annotations ) {

    Array.prototype.forEach.call( annotations, function( parentEl, parentIndex ) {

        const numbered = parentEl.classList.contains( 'unnumber' );
        const annotationImgEl = parentEl.querySelector( 'img' );
        let imgNaturalWidth = parentEl.width;
        let imgNaturalHeight = parentEl.height;

        const annotationDiv = parentEl.querySelector( '.annotations' );
        const imgPanel = parentEl.querySelector( '.image-container' );
        const ariaDescribeAttrValue = 'annotation' + ( parentIndex + 1 );

        // add the aria-describedby attribute to link the image to the commentary
        annotationImgEl.setAttribute( 'aria-describedby', ariaDescribeAttrValue );
        annotationDiv.setAttribute( 'id', ariaDescribeAttrValue );

        let tempImg = new Image();
        tempImg.src = annotationImgEl.src;

        tempImg.addEventListener( 'load', function() {

            imgNaturalWidth = annotationImgEl.naturalWidth;
            imgNaturalHeight = annotationImgEl.naturalHeight;

            // check image size and then set position indicators
            if ( imgNaturalWidth >= 640 && imgNaturalHeight >= 360 ) {

                // create the div element to hold the indicators
                const indicatorsDiv = document.createElement( 'div' );
                indicatorsDiv.classList.add( 'indicators' );
                indicatorsDiv.setAttribute( 'aria-hidden', 'true' );

                // get indicator position for each annotation
                let annotationItems = annotationDiv.querySelectorAll( '.annotations .annotation-item' );
                let annotations = [];
                let commentaryPanel = null;

                Array.prototype.forEach.call( annotationItems, ( item, itemIndex ) => {

                    const position = item.querySelector( '.position' ).innerText;
                    const title = item.querySelector( '.title' ).innerText;
                    const commentary = item.querySelector( '.commentary' ).innerHTML;
                    const xyRaw = position.split( ',', 2 );
                    const xyPos = {
                        'x': Number( xyRaw[0].trim() ),
                        'y': Number( xyRaw[1].trim() )
                    };

                    // create and display indicator for currrent annotation item
                    const indicatorItem = document.createElement( 'div' );
                    indicatorItem.classList.add( 'indicator' );
                    indicatorItem.style.left = toPercentage( xyPos.x , imgNaturalWidth ) + '%';
                    indicatorItem.style.top = toPercentage( xyPos.y , imgNaturalHeight ) + '%';
                    
                    const indicatorBtn = document.createElement( 'button' );
                    indicatorBtn.setAttribute( 'data-index', itemIndex );
                    indicatorBtn.classList.add( 'dot' );

                    if ( !numbered ) {
                        indicatorBtn.innerHTML = itemIndex + 1;
                    }

                    const tooltip = createAnnotationTooltip( title );

                    if ( xyPos.x < imgNaturalWidth - 310 ) {
                        tooltip.classList.add( 'right' );
                    } else {
                        tooltip.classList.add( 'left' );
                    }

                    indicatorItem.appendChild( indicatorBtn );
                    indicatorItem.appendChild( tooltip );
                    indicatorsDiv.appendChild( indicatorItem );
                    
                    // add to annotation array
                    annotations.push( {
                        'number': itemIndex + 1,
                        'unnumber': numbered,
                        'position': position,
                        'title': title,
                        'commentary': commentary
                    } );

                    // add button event listener to indicator buttons
                    indicatorBtn.addEventListener( 'click', ( evt ) => {

                        const btn = evt.target;
                        const btnIndex = Number( btn.getAttribute( 'data-index' ) );

                        // remove any opened commentary panel first
                        if ( imgPanel.querySelector( '.commentary-panel' ) ) {

                            commentaryPanel = imgPanel.querySelector( '.commentary-panel' );
                            commentaryPanel.querySelector( '.closeBtn' ).removeEventListener( 'click', closeAnnotationCommentary );
                            imgPanel.removeChild( commentaryPanel );
                            commentaryPanel = null;

                        }

                        // toggle commentary panel
                        if ( btn.parentNode.classList.contains( 'active' ) ) {

                            btn.parentNode.classList.remove( 'active' );

                        } else {

                            parentEl.querySelectorAll( '.indicators .indicator' ).forEach( ( indicator ) => {
                                
                                if ( indicator.classList.contains( 'active') ) {
                                    indicator.classList.remove( 'active' );
                                }

                            } );

                            btn.parentNode.classList.add( 'active' );
                            commentaryPanel = createAnnotationCommentaryPanel( annotations[btnIndex] )

                            if ( imgNaturalWidth > imgNaturalHeight ) {

                                if ( xyPos.x < imgNaturalWidth / 2 - 50 ) {
                                    commentaryPanel.classList.add( 'right' );
                                } else {
                                    commentaryPanel.classList.add( 'left' );
                                }

                            } else {

                                if ( xyPos.y < imgNaturalHeight / 2 - 50 ) {
                                    commentaryPanel.classList.add( 'bottom' );
                                } else {
                                    commentaryPanel.classList.add( 'top' );
                                }

                            }

                            imgPanel.appendChild( commentaryPanel );

                        }

                    } );

                } );

                // add the div element holding the indicators to the current annotation element
                imgPanel.appendChild( indicatorsDiv );
                
            } else {

                const errMsgDiv = document.createElement( 'div' );
                
                errMsgDiv.classList.add( 'error' );
                errMsgDiv.innerHTML = 'Image is too narrow or small for annotation. Please make sure the image\'s width and height are at least greater or equal to 640 pixels by 360 pixels';

                imgPanel.appendChild( errMsgDiv );

            }

        } );

    } );

}

/**
 * Enable all slide show component.
 * @function enableSlideshow
 * @param {Object[]} slideshow - Collection of slide show elements.
 * @since 3.1.0
 */
function enableSlideshow( slideshow ) {

    const progressTick = 1000;
    const interval = 15000;

    // loop through every slideshows
    Array.prototype.forEach.call( slideshow, function( parentEl, parentIndex ) {
        
        // get all slides in the slideshow
        const slides = parentEl.querySelectorAll( '.slide' );

        // looping flag
        let looping = false;
        let playing = false;

        // slide image index counter
        let currentIndex = 0;

        // slide auto-advance interval
        let progressInterval;
        let slideInterval;

        // create the slide show view area and toolbar
        const slideViewEl = document.createElement( 'div' );
        slideViewEl.classList.add( 'slide-view' );
        slideViewEl.setAttribute( 'aria-hidden', 'true' );

        const imgAreaEl = document.createElement( 'div' );
        imgAreaEl.classList.add( 'img-area' );

        const imgWrapper = document.createElement( 'div' );
        imgWrapper.classList.add( 'img' );

        const img = new Image();
        img.src = slides[currentIndex].querySelector( 'img' ).src;

        imgWrapper.style.backgroundImage = 'url(' + img.src + ')';
        imgWrapper.appendChild( img );

        const toolbarEl = document.createElement( 'div' );
        toolbarEl.classList.add( 'toolbar' );

        const progressBar = document.createElement( 'div' );
        progressBar.classList.add( 'progress-bar' );

        const leftColEl = document.createElement( 'div' );
        leftColEl.classList.add( 'left-col' );

        const playPauseBtn = document.createElement( 'button' );
        playPauseBtn.classList.add( 'play-btn' );
        playPauseBtn.setAttribute( 'title', 'Play' );

        playPauseBtn.addEventListener( 'click', (evt) => {
            
            const playPause = evt.currentTarget;

            if ( playPause.classList.contains ( 'play-btn' ) ) {
                playPause.classList.remove( 'play-btn' );
                playPause.classList.add( 'pause-btn' )
                playPauseBtn.setAttribute( 'title', 'Pause' );
                playing = true;
            } else {
                playPause.classList.add( 'play-btn' );
                playPause.classList.remove( 'pause-btn' )
                playPauseBtn.setAttribute( 'title', 'Play' );
                playing = false;
            }

            if ( playing ) {
                slideInterval = setInterval( advanceSlide, interval );
                resetProgress();
            } else {
                clearInterval( slideInterval );
                clearInterval( progressInterval );
                progressBar.style.width = '0';
                progressBar.style.display = 'none';
            }

        } );

        leftColEl.appendChild( playPauseBtn );

        const centerColEl = document.createElement( 'div' );
        centerColEl.classList.add( 'center-col' );

        const prevBtn = document.createElement( 'button' );
        prevBtn.classList.add( 'prev-btn' );
        prevBtn.setAttribute( 'title', 'Previous' );

        prevBtn.addEventListener( 'click', () => {

            // if slide show is playing reset timer
            if ( playing) {
                clearInterval( slideInterval );
                slideInterval = setInterval( advanceSlide, interval );
                resetProgress();
            }
            
            // go to previous slide
            currentIndex--;

            if ( currentIndex < 0 ) {
                currentIndex = slides.length - 1;
            }

            updateSlide();

        } );

        const nextBtn = document.createElement( 'button' );
        nextBtn.classList.add( 'next-btn' );
        nextBtn.setAttribute( 'title', 'Next' );

        nextBtn.addEventListener( 'click', () => {

            // if slide show is playing reset timer
            if ( playing) {
                clearInterval( slideInterval );
                slideInterval = setInterval( advanceSlide, interval );
                resetProgress();
            }
            
            // go to next slide
            currentIndex++;

            if ( currentIndex > slides.length - 1 ) {
                currentIndex = 0;
            }

            updateSlide();
            
        } );

        function advanceSlide() {

            if ( playing ) {

                currentIndex++;

                if ( currentIndex == slides.length - 1 && !looping ) {
                    playPauseBtn.click();
                }

                if ( currentIndex > slides.length - 1 ) {
                    currentIndex = 0;
                }

                updateSlide();
                resetProgress();
                

            }

        }

        function updateProgressBar() {

            if ( playing ) {

                progressBar.style.display = '';
                const lengthToIncrease = imgAreaEl.offsetWidth / ( interval / 1000 );
                let width  = progressBar.offsetWidth;

                if ( width == 0 ) {
                    width = lengthToIncrease + 10;
                }

                width = width + lengthToIncrease;

                progressBar.style.width = width + 'px';

            }

        }

        function resetProgress() {

            if ( playing ) {

                clearInterval( progressInterval );
                progressInterval = setInterval( updateProgressBar, progressTick );
                progressBar.style.width = '0';
                progressBar.style.display = 'none';

            }

        }

        function updateSlide() {

            img.classList.add( 'puff-in-hor' );
            img.src = slides[currentIndex].querySelector( 'img' ).src;
            
            img.addEventListener( 'animationend', () => {
                img.classList.remove( 'puff-in-hor' );
                imgWrapper.style.backgroundImage = 'url(' + img.src + ')';
            }, { once: true } );

            commentaryEl.innerHTML = slides[currentIndex].querySelector( '.commentary' ).innerHTML;
            paging.innerHTML = (currentIndex + 1) + ' / ' + slides.length;

        }

        const paging = document.createElement( 'span' );
        paging.classList.add( 'page' );
        paging.innerHTML = (currentIndex + 1) + ' / ' + slides.length;

        centerColEl.appendChild( prevBtn );
        centerColEl.appendChild( paging );
        centerColEl.appendChild( nextBtn );

        const rightColEl = document.createElement( 'div' );
        rightColEl.classList.add( 'right-col' );

        const loopBtn = document.createElement( 'button' );
        loopBtn.classList.add( 'loop-btn' );
        loopBtn.setAttribute( 'title', 'Toggle loop' );

        loopBtn.addEventListener( 'click', (evt) => {

            const loop = evt.currentTarget;

            if ( loop.classList.contains( 'active' ) ) {
                loop.classList.remove( 'active' );
                looping = false;
            } else {
                loop.classList.add( 'active' );
                looping = true;
            }
            
        } );

        rightColEl.appendChild( loopBtn );

        toolbarEl.appendChild( progressBar );
        toolbarEl.appendChild( leftColEl );
        toolbarEl.appendChild( centerColEl );
        toolbarEl.appendChild( rightColEl );

        imgAreaEl.appendChild( imgWrapper );
        imgAreaEl.appendChild( toolbarEl );

        const commentaryEl = document.createElement( 'div' );
        commentaryEl.classList.add( 'commentary' );
        commentaryEl.innerHTML = slides[currentIndex].querySelector( '.commentary' ).innerHTML;

        slideViewEl.appendChild( imgAreaEl );
        slideViewEl.appendChild( commentaryEl );

        parentEl.insertBefore( slideViewEl, parentEl.firstChild );

        // loop through every slides
        Array.prototype.forEach.call( slides, function( slide, slideNum ) {
            
            const id = 'droplets-ss-' + parentIndex + '-' + ( slideNum + 1 );

            // hide the individual slides
            slide.classList.add( 'hidden' );

            const img = slide.querySelector( 'img' );
            img.setAttribute( 'aria-describedby', id );
            
            const commentary = slide.querySelector( '.commentary' );
            commentary.setAttribute( 'id', id );
            
        } );

    } );

}

/**
 * Enable all speak component.
 * @function enableSpeak
 * @param {Object[]} speak - Collection of speak elements.
 * @since 3.1.0
 */
 function enableSpeak( speak ) {

    // created the shared audio player
    const page = document.getElementById( 'uws-droplets-page' );
    const audioPlayer = document.createElement( 'audio' );
    
    audioPlayer.setAttribute( 'aria-hidden', true );
    page.appendChild( audioPlayer );

    // for each speak element
    speak.forEach( ( button, index ) => {
        
        button.setAttribute( 'id', 'd-speak-' + index );
        button.setAttribute( 'aria-label', 'Listen' );
        button.setAttribute( 'role', 'button' );
        button.classList.add( 'ready' );

        // add click event to play the targeted audio
        button.addEventListener( 'click', ( evt ) => {
            
            // reset first
            speak.forEach( ( item ) => {
                item.classList.remove( 'playing' );
            } );

            if ( !audioPlayer.paused ) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }

            // pass the speak reference and and play the audio

            const currentTarget = evt.currentTarget;

            currentTarget.classList.add( 'playing' );

            audioPlayer.setAttribute( 'data-reference', currentTarget.id );
            audioPlayer.src = currentTarget.dataset.src;
            audioPlayer.play();

        } );

    } );

    // on audio ended, removing playing class, src, and reference
    audioPlayer.addEventListener( 'ended', () => {

        const source = document.querySelector( '#' + audioPlayer.dataset.reference );
        
        source.classList.remove( 'playing' );
        audioPlayer.removeAttribute( 'src' );
        audioPlayer.removeAttribute( 'data-reference' );

    } );

    audioPlayer.addEventListener( 'error', () => {
        
        const source = document.querySelector( '#' + audioPlayer.dataset.reference );
        source.classList.remove( 'playing' );
        source.classList.add( 'error' );

    } );

 }

/*********************************************************
  MISC. DROPLETS HELPER FUNCTIONS
**********************************************************/

/**
 * Helper function to check if string is empty or undefined
 * @function isEmpty
 * @param {String} str - a string.
 * @return {Boolean}
 * @since 3.0.0
 */
function isEmpty( str ) {
    return !str || 0 === str.length;
}

/**
 * Helper function get the percentage of a fraction
 * @function toPercentage
 * @param {Number} numerator - a number.
 * @param {Number} denominator - a number.
 * @return {Number}
 * @since 3.1.0
 */
function toPercentage( numerator, denominator ) {
    return numerator / denominator * 100;
}

/**
 * Helper function to create annotation tooltip
 * @function createAnnotationTooltip
 * @param {String} title - a string.
 * @return {Node}
 * @since 3.1.0
 */
 function createAnnotationTooltip( title ) {

    const tooltip = document.createElement( 'div' );
    tooltip.classList.add( 'tooltip' );

    const tpTitle = document.createElement( 'div' );
    tpTitle.classList.add( 'title' );
    tpTitle.innerHTML = title;

    const tpHelpTxt = document.createElement( 'div' );
    tpHelpTxt.classList.add( 'help-txt' );
    tpHelpTxt.innerHTML = 'Click to expand for more details.';

    tooltip.appendChild( tpTitle );
    tooltip.appendChild( tpHelpTxt );

    return tooltip;

 }

 /**
 * Helper function to create annotation commentary panel
 * @function createAnnotationCommentaryPanel
 * @param {Object} annotation - an annotation object.
 * @return {Node}
 * @since 3.1.0
 */
function createAnnotationCommentaryPanel( annotation ) {

    const panel = document.createElement( 'div' );
    panel.classList.add( 'commentary-panel' );
    panel.setAttribute( 'aria-hidden', 'true' );

    const closeBtn = document.createElement( 'button' );
    closeBtn.classList.add( 'closeBtn' );
    closeBtn.innerHTML = '&times;';

    closeBtn.addEventListener( 'click', closeAnnotationCommentary );

    const headDiv = document.createElement( 'div' );
    headDiv.classList.add( 'head' );
    
    const headNum = document.createElement( 'div' );
    headNum.classList.add( 'number' );

    if ( !annotation.unnumber ) {
        headNum.innerHTML = annotation.number;
    }
    
    const headTitle = document.createElement( 'h4' );
    headTitle.innerHTML = annotation.title;

    const bodyDiv = document.createElement( 'div' );
    bodyDiv.classList.add( 'body' );
    bodyDiv.innerHTML = annotation.commentary;

    headDiv.appendChild( headNum );
    headDiv.appendChild( headTitle );

    panel.appendChild( closeBtn );
    panel.appendChild( headDiv );
    panel.appendChild( bodyDiv );

    return panel;

 }

  /**
 * Helper function to close annotation commentary panel
 * @function closeAnnotationCommentary
 * @param {Event} evt - an event.
 * @since 3.1.0
 */

 function closeAnnotationCommentary( evt ) {

    evt.target.parentNode.parentNode.querySelectorAll( '.indicators .indicator' ).forEach( ( indicator ) => {
                                
        if ( indicator.classList.contains( 'active') ) {
            indicator.classList.remove( 'active' );
        }

    } );

    evt.currentTarget.removeEventListener( 'click', closeAnnotationCommentary );
    evt.target.parentNode.parentNode.removeChild( evt.target.parentNode );

 }

/**
 * Enable all (old way) tab elements.
 * @function enableTabs
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableTabs( tabs ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {
        
        // set each tab element's tabs and sections
        const tabBtns = tabWrapper.querySelectorAll( '.tabs li' );
        const tabSections = tabWrapper.querySelectorAll( '.tab-contents .tab-section' );

        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // add event listener to each tab
            tab.addEventListener( 'click', function( evt ) {
                
                // remove active class from all tab
                // and hide tab sections
                Array.prototype.forEach.call( tabBtns, function( el, i ) {
                    
                    el.classList.remove( 'active' );
                    el.setAttribute( 'aria-selected', 'false' );
                    tabSections[i].classList.remove( 'active' );
                    
                });
                
                // add active class to current clicked tab
                // and display corresponding tab section
                this.classList.add( 'active' );
                this.setAttribute( 'aria-selected', 'true' );
                tabSections[i].classList.add( 'active' );
                tabSections[i].setAttribute( 'aria-selected', 'true' );
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        });
        
    } );
    
}

/**
 * Enable all (old way) accordion elements.
 * @function enableAccordions
 * @param {Object[]} accordions - Collection of accordion elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableAccordions( accordions ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( accordions, function( accordionWrapper ) {
        
        // query the accordion title banners
        const titleBanners = accordionWrapper.querySelectorAll( '.accordion-title' );
        
        // create the accordion controls for each accordion
        const accordionControlsWrapper = document.createElement( 'div' );
        accordionControlsWrapper.classList.add( 'accordion-controls' );
        
        const closeBtn = document.createElement( 'a' );
        closeBtn.classList.add( 'closeAll' );
        closeBtn.setAttribute( 'role', 'button' );
        closeBtn.innerHTML = 'Close All';
        closeBtn.href = 'javascript:void(0)';
        
        const openBtn = document.createElement( 'a' );
        openBtn.classList.add( 'openAll' );
        openBtn.setAttribute( 'role', 'button' );
        openBtn.innerHTML = 'Open All';
        openBtn.href = 'javascript:void(0)';
        
        accordionControlsWrapper.appendChild( closeBtn );
        accordionControlsWrapper.appendChild( openBtn );
        
        // add the accordion controls to the DOM
        accordionWrapper.insertBefore( accordionControlsWrapper, accordionWrapper.firstChild );
        
        // add event listener to the close all control
        closeBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                closeAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // add event listener to open all control
        openBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                openAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // loop through each title banner
        Array.prototype.forEach.call( titleBanners, function( banner ) {
            
            // if it contains active class, display the accordion content
            if ( banner.classList.contains( 'active' ) ) {
                openAccordionItem( banner );
            }
            
            // add event listener to each title banner
            banner.addEventListener( 'click', function( evt ) {
                
                // if current target is open, close it
                if ( this.classList.contains( 'active' ) ) {
                    closeAccordionItem( this );
                } else {
                    
                    // close all of the accordion
                    Array.prototype.forEach.call( titleBanners, function( el ) {
                        closeAccordionItem( el );
                    } );
                    
                    // open the current target
                    openAccordionItem( this );
                    
                }
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        } );
        
    } );
    
}

/**
 * Close accordion item.
 * @function closeAccordionItem
 * @param {Object} el - element to be hidden.
 * @since 2.0.0
 */
function closeAccordionItem( el ) {
    
    if ( el.classList.contains( 'active' ) ) {
                            
        el.nextElementSibling.style.display = 'none';
        el.nextElementSibling.setAttribute( 'aria-expanded', 'false' );
        el.classList.remove( 'active' );
        
    }
    
}

/**
 * Open accordion item.
 * @function openAccordionItem
 * @param {Object} el - element to be displayed.
 * @since 2.0.0
 */
function openAccordionItem( el ) {
    
    el.classList.add( 'active' );
    el.nextElementSibling.setAttribute( 'aria-expanded', 'true' );
    el.nextElementSibling.style.display = 'block';
    
}

/* PrismJS 1.25.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+java+python+r&plugins=line-numbers+normalize-whitespace */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,e={},M={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof W?new W(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n;switch(r=r||{},M.util.type(e)){case"Object":if(n=M.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=M.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r)}),a);default:return e}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,"gi"),""),e.classList.add("language-"+n)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return!0;if(a.contains(r))return!1;e=e.parentElement}return!!t}},languages:{plain:e,plaintext:e,text:e,txt:e,extend:function(e,n){var t=M.util.clone(M.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||M.languages)[t],i={};for(var l in a)if(a.hasOwnProperty(l)){if(l==e)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);n.hasOwnProperty(l)||(i[l]=a[l])}var s=r[t];return r[t]=i,M.languages.DFS(M.languages,function(e,n){n===s&&e!=t&&(this[e]=i)}),i},DFS:function e(n,t,r,a){a=a||{};var i=M.util.objId;for(var l in n)if(n.hasOwnProperty(l)){t.call(n,l,n[l],r||l);var o=n[l],s=M.util.type(o);"Object"!==s||a[i(o)]?"Array"!==s||a[i(o)]||(a[i(o)]=!0,e(o,t,l,a)):(a[i(o)]=!0,e(o,t,null,a))}}},plugins:{},highlightAll:function(e,n){M.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};M.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),M.hooks.run("before-all-elements-highlight",r);for(var a,i=0;a=r.elements[i++];)M.highlightElement(a,!0===n,r.callback)},highlightElement:function(e,n,t){var r=M.util.getLanguage(e),a=M.languages[r];M.util.setLanguage(e,r);var i=e.parentElement;i&&"pre"===i.nodeName.toLowerCase()&&M.util.setLanguage(i,r);var l={element:e,language:r,grammar:a,code:e.textContent};function o(e){l.highlightedCode=e,M.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,M.hooks.run("after-highlight",l),M.hooks.run("complete",l),t&&t.call(l.element)}if(M.hooks.run("before-sanity-check",l),(i=l.element.parentElement)&&"pre"===i.nodeName.toLowerCase()&&!i.hasAttribute("tabindex")&&i.setAttribute("tabindex","0"),!l.code)return M.hooks.run("complete",l),void(t&&t.call(l.element));if(M.hooks.run("before-highlight",l),l.grammar)if(n&&u.Worker){var s=new Worker(M.filename);s.onmessage=function(e){o(e.data)},s.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else o(M.highlight(l.code,l.grammar,l.language));else o(M.util.encode(l.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};return M.hooks.run("before-tokenize",r),r.tokens=M.tokenize(r.code,r.grammar),M.hooks.run("after-tokenize",r),W.stringify(M.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new i;return I(a,a.head,e),function e(n,t,r,a,i,l){for(var o in r)if(r.hasOwnProperty(o)&&r[o]){var s=r[o];s=Array.isArray(s)?s:[s];for(var u=0;u<s.length;++u){if(l&&l.cause==o+","+u)return;var c=s[u],g=c.inside,f=!!c.lookbehind,h=!!c.greedy,d=c.alias;if(h&&!c.pattern.global){var v=c.pattern.toString().match(/[imsuy]*$/)[0];c.pattern=RegExp(c.pattern.source,v+"g")}for(var p=c.pattern||c,m=a.next,y=i;m!==t.tail&&!(l&&y>=l.reach);y+=m.value.length,m=m.next){var k=m.value;if(t.length>n.length)return;if(!(k instanceof W)){var x,b=1;if(h){if(!(x=z(p,y,n,f))||x.index>=n.length)break;var w=x.index,A=x.index+x[0].length,P=y;for(P+=m.value.length;P<=w;)m=m.next,P+=m.value.length;if(P-=m.value.length,y=P,m.value instanceof W)continue;for(var E=m;E!==t.tail&&(P<A||"string"==typeof E.value);E=E.next)b++,P+=E.value.length;b--,k=n.slice(y,P),x.index-=y}else if(!(x=z(p,0,k,f)))continue;var w=x.index,L=x[0],S=k.slice(0,w),O=k.slice(w+L.length),j=y+k.length;l&&j>l.reach&&(l.reach=j);var C=m.prev;S&&(C=I(t,C,S),y+=S.length),q(t,C,b);var N=new W(o,g?M.tokenize(L,g):L,d,L);if(m=I(t,C,N),O&&I(t,m,O),1<b){var _={cause:o+","+u,reach:j};e(n,t,r,m.prev,y,_),l&&_.reach>l.reach&&(l.reach=_.reach)}}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=M.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=M.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n)}},Token:W};function W(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length}function z(e,n,t,r){e.lastIndex=n;var a=e.exec(t);if(a&&r&&a[1]){var i=a[1].length;a.index+=i,a[0]=a[0].slice(i)}return a}function i(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function I(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function q(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a}if(u.Prism=M,W.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t)}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},i=e.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(a.classes,i):a.classes.push(i)),M.hooks.run("wrap",a);var l="";for(var o in a.attributes)l+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+l+">"+a.content+"</"+a.tag+">"},!u.document)return u.addEventListener&&(M.disableWorkerMessageHandler||u.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;u.postMessage(M.highlight(r,M.languages[t],t)),a&&u.close()},!1)),M;var r=M.util.currentScript();function a(){M.manual||M.highlightAll()}if(r&&(M.filename=r.src,r.hasAttribute("data-manual")&&(M.manual=!0)),!M.manual){var l=document.readyState;"loading"===l||"interactive"===l&&r&&r.defer?document.addEventListener("DOMContentLoaded",a):window.requestAnimationFrame?window.requestAnimationFrame(a):window.setTimeout(a,16)}return M}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(a,e){var s={};s["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var t={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};t["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var n={};n[a]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:t},Prism.languages.insertBefore("markup","cdata",n)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(a,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp("(^|[\"'\\s])(?:"+a+")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))","i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml;
!function(s){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var t=s.languages.markup;t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"))}(Prism);
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),Prism.languages.js=Prism.languages.javascript;
!function(e){var t=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,n="(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*",a={pattern:RegExp(n+"[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};e.languages.java=e.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[a,{pattern:RegExp(n+"[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()])"),lookbehind:!0,inside:a.inside}],keyword:t,function:[e.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0}}),e.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),e.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":a,keyword:t,punctuation:/[<>(),.:]/,operator:/[?&|]/}},namespace:{pattern:RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g,function(){return t.source})),lookbehind:!0,inside:{punctuation:/\./}}})}(Prism);
Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python;
Prism.languages.r={comment:/#.*/,string:{pattern:/(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},"percent-operator":{pattern:/%[^%\s]*%/,alias:"operator"},boolean:/\b(?:FALSE|TRUE)\b/,ellipsis:/\.\.(?:\.|\d+)/,number:[/\b(?:Inf|NaN)\b/,/(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],keyword:/\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,operator:/->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,punctuation:/[(){}\[\],;]/};
!function(){if("undefined"!=typeof Prism&&"undefined"!=typeof document){var o="line-numbers",a=/\n(?!$)/g,e=Prism.plugins.lineNumbers={getLine:function(e,n){if("PRE"===e.tagName&&e.classList.contains(o)){var t=e.querySelector(".line-numbers-rows");if(t){var i=parseInt(e.getAttribute("data-start"),10)||1,r=i+(t.children.length-1);n<i&&(n=i),r<n&&(n=r);var s=n-i;return t.children[s]}}},resize:function(e){u([e])},assumeViewportIndependence:!0},n=void 0;window.addEventListener("resize",function(){e.assumeViewportIndependence&&n===window.innerWidth||(n=window.innerWidth,u(Array.prototype.slice.call(document.querySelectorAll("pre."+o))))}),Prism.hooks.add("complete",function(e){if(e.code){var n=e.element,t=n.parentNode;if(t&&/pre/i.test(t.nodeName)&&!n.querySelector(".line-numbers-rows")&&Prism.util.isActive(n,o)){n.classList.remove(o),t.classList.add(o);var i,r=e.code.match(a),s=r?r.length+1:1,l=new Array(s+1).join("<span></span>");(i=document.createElement("span")).setAttribute("aria-hidden","true"),i.className="line-numbers-rows",i.innerHTML=l,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(i),u([t]),Prism.hooks.run("line-numbers",e)}}}),Prism.hooks.add("line-numbers",function(e){e.plugins=e.plugins||{},e.plugins.lineNumbers=!0})}function u(e){if(0!=(e=e.filter(function(e){var n=function(e){return e?window.getComputedStyle?getComputedStyle(e):e.currentStyle||null:null}(e)["white-space"];return"pre-wrap"===n||"pre-line"===n})).length){var n=e.map(function(e){var n=e.querySelector("code"),t=e.querySelector(".line-numbers-rows");if(n&&t){var i=e.querySelector(".line-numbers-sizer"),r=n.textContent.split(a);i||((i=document.createElement("span")).className="line-numbers-sizer",n.appendChild(i)),i.innerHTML="0",i.style.display="block";var s=i.getBoundingClientRect().height;return i.innerHTML="",{element:e,lines:r,lineHeights:[],oneLinerHeight:s,sizer:i}}}).filter(Boolean);n.forEach(function(e){var i=e.sizer,n=e.lines,r=e.lineHeights,s=e.oneLinerHeight;r[n.length-1]=void 0,n.forEach(function(e,n){if(e&&1<e.length){var t=i.appendChild(document.createElement("span"));t.style.display="block",t.textContent=e}else r[n]=s})}),n.forEach(function(e){for(var n=e.sizer,t=e.lineHeights,i=0,r=0;r<t.length;r++)void 0===t[r]&&(t[r]=n.children[i++].getBoundingClientRect().height)}),n.forEach(function(e){var n=e.sizer,t=e.element.querySelector(".line-numbers-rows");n.style.display="none",n.innerHTML="",e.lineHeights.forEach(function(e,n){t.children[n].style.height=e+"px"})})}}}();
!function(){if("undefined"!=typeof Prism){var i=Object.assign||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t]);return e};e.prototype={setDefaults:function(e){this.defaults=i(this.defaults,e)},normalize:function(e,n){for(var t in n=i(this.defaults,n)){var r=t.replace(/-(\w)/g,function(e,n){return n.toUpperCase()});"normalize"!==t&&"setDefaults"!==r&&n[t]&&this[r]&&(e=this[r].call(this,e,n[t]))}return e},leftTrim:function(e){return e.replace(/^\s+/,"")},rightTrim:function(e){return e.replace(/\s+$/,"")},tabsToSpaces:function(e,n){return n=0|n||4,e.replace(/\t/g,new Array(++n).join(" "))},spacesToTabs:function(e,n){return n=0|n||4,e.replace(RegExp(" {"+n+"}","g"),"\t")},removeTrailing:function(e){return e.replace(/\s*?$/gm,"")},removeInitialLineFeed:function(e){return e.replace(/^(?:\r?\n|\r)/,"")},removeIndent:function(e){var n=e.match(/^[^\S\n\r]*(?=\S)/gm);return n&&n[0].length?(n.sort(function(e,n){return e.length-n.length}),n[0].length?e.replace(RegExp("^"+n[0],"gm"),""):e):e},indent:function(e,n){return e.replace(/^[^\S\n\r]*(?=\S)/gm,new Array(++n).join("\t")+"$&")},breakLines:function(e,n){n=!0===n?80:0|n||80;for(var t=e.split("\n"),r=0;r<t.length;++r)if(!(s(t[r])<=n)){for(var i=t[r].split(/(\s+)/g),o=0,a=0;a<i.length;++a){var l=s(i[a]);n<(o+=l)&&(i[a]="\n"+i[a],o=l)}t[r]=i.join("")}return t.join("\n")}},"undefined"!=typeof module&&module.exports&&(module.exports=e),Prism.plugins.NormalizeWhitespace=new e({"remove-trailing":!0,"remove-indent":!0,"left-trim":!0,"right-trim":!0}),Prism.hooks.add("before-sanity-check",function(e){var n=Prism.plugins.NormalizeWhitespace;if((!e.settings||!1!==e.settings["whitespace-normalization"])&&Prism.util.isActive(e.element,"whitespace-normalization",!0))if(e.element&&e.element.parentNode||!e.code){var t=e.element.parentNode;if(e.code&&t&&"pre"===t.nodeName.toLowerCase()){for(var r=t.childNodes,i="",o="",a=!1,l=0;l<r.length;++l){var s=r[l];s==e.element?a=!0:"#text"===s.nodeName&&(a?o+=s.nodeValue:i+=s.nodeValue,t.removeChild(s),--l)}if(e.element.children.length&&Prism.plugins.KeepMarkup){var c=i+e.element.innerHTML+o;e.element.innerHTML=n.normalize(c,e.settings),e.code=e.element.textContent}else e.code=i+e.code+o,e.code=n.normalize(e.code,e.settings)}}else e.code=n.normalize(e.code,e.settings)})}function e(e){this.defaults=i({},e)}function s(e){for(var n=0,t=0;t<e.length;++t)e.charCodeAt(t)=="\t".charCodeAt(0)&&(n+=3);return e.length+n}}();