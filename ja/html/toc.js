// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Getting started</li><li class="chapter-item expanded "><a href="getting_started/apps/index.html"><strong aria-hidden="true">1.</strong> Using OpenRR Apps</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="getting_started/apps/installation.html"><strong aria-hidden="true">1.1.</strong> Installation</a></li><li class="chapter-item expanded "><a href="getting_started/apps/gui.html"><strong aria-hidden="true">1.2.</strong> Operating robot from GUI</a></li><li class="chapter-item expanded "><a href="getting_started/apps/cli.html"><strong aria-hidden="true">1.3.</strong> Operating robot from CLI</a></li><li class="chapter-item expanded "><a href="getting_started/apps/teleop.html"><strong aria-hidden="true">1.4.</strong> Robot teleoperation</a></li><li class="chapter-item expanded "><a href="getting_started/apps/mobile.html"><strong aria-hidden="true">1.5.</strong> Operating mobile robot with ROS2 and openrr-teleop</a></li><li class="chapter-item expanded "><a href="getting_started/apps/arm.html"><strong aria-hidden="true">1.6.</strong> Operating robot arm with ROS/ROS2 and openrr-teleop</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Reference</li><li class="chapter-item expanded "><a href="reference/apps/index.html"><strong aria-hidden="true">2.</strong> OpenRR Apps Usage</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="reference/apps/robot_command.html"><strong aria-hidden="true">2.1.</strong> openrr_apps_robot_command</a></li><li class="chapter-item expanded "><a href="reference/apps/robot_teleop.html"><strong aria-hidden="true">2.2.</strong> openrr_apps_robot_teleop</a></li><li class="chapter-item expanded "><a href="reference/apps/joint_position_sender.html"><strong aria-hidden="true">2.3.</strong> openrr_apps_joint_position_sender</a></li><li class="chapter-item expanded "><a href="reference/apps/velocity_sender.html"><strong aria-hidden="true">2.4.</strong> openrr_apps_velocity_sender</a></li></ol></li><li class="chapter-item expanded "><a href="reference/apps-config/index.html"><strong aria-hidden="true">3.</strong> OpenRR Apps Configuration</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="reference/apps-config/client.html"><strong aria-hidden="true">3.1.</strong> Client config</a></li><li class="chapter-item expanded "><a href="reference/apps-config/teleop.html"><strong aria-hidden="true">3.2.</strong> Teleop config</a></li><li class="chapter-item expanded "><a href="reference/apps-config/env.html"><strong aria-hidden="true">3.3.</strong> Environmental Variables</a></li><li class="chapter-item expanded "><a href="reference/apps-config/overwrite.html"><strong aria-hidden="true">3.4.</strong> Overwrite configuration at startup</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Develop</li><li class="chapter-item expanded "><a href="develop/index.html"><strong aria-hidden="true">4.</strong> Develop OpenRR</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="develop/developer.html"><strong aria-hidden="true">4.1.</strong> For Developer</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Appendix</li><li class="chapter-item expanded "><a href="appendix/troubleshooting.html"><strong aria-hidden="true">5.</strong> Troubleshooting</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
