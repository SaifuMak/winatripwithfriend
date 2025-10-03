"use client";

import React from "react";

const AbridgedTermsData = () => {
    const ulStyle = "list-disc list-outside mb-6 pl-8 space-y-2";

    return (
        <div className=" p-6 md:p-12  lg:text-[17px] max-w-7xl mx-auto text-white">
            <h1 className="text-3xl text-center md:text-4xl  font-bold mb-12">
                The Star CTW Trip to Coachella Promotion
                Abridged Terms


            </h1>

            <h2 className="text-2xl font-semibold mb-4">Abridged Terms</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                <ul className={ulStyle}>
                    <li>
                        Any changes made to the full terms and conditions may affect the
                        details to be included below.
                    </li>
                    <li>
                        The provision of the below copy does not amount to automatic legal
                        approval of any advertising containing the below copy. If you
                        require approval of any promotional advertising, please send
                        through to our office for legal review.
                    </li>
                    <li>
                        <strong>
                            Repeated details may be removed from abridged terms:</strong> Any details
                        which are already included in the main body of the ad may be removed
                        from the abridged terms which will appear on that ad (e.g. if end
                        date/time specified in main body of the ad, it can be omitted from
                        the fine print copy).
                    </li>
                    <li>
                        <strong>Entry Instructions:</strong> Entry instructions will also need to be specified
                        in the ad, unless otherwise advised by our office.
                    </li>
                    <li>
                        <strong>Medium:</strong>  We have outlined below the required abridged terms to be used
                        on different mediums.
                    </li>
                    <li>
                        <strong>Start Date:</strong> For any online advertising material, we assume this will
                        not be published until on or after the Promotion start date. If this
                        is not the case, the Start date/time must also be included in the
                        abridged terms.
                    </li>
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Print</h3>
                <p>
                    Aus res. 18+ and entitled to access The Star Gold Coast only. Ends
                    11:59pm AEST 30/11/25. Max 1 entry/transaction.
                    <strong>
                        Guests must be 18
                        years or over to enter the casino. BET WITH YOUR HEAD, NOT OVER IT.
                        Gambling Helpline 1800 858 858 gamblinghelpqld.org.au.</strong> See URL for
                    Terms and Conditions.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Online/eDM</h3>
                <p>
                    AU18+ and entitled to access The Star Gold Coast only. Ends 11:59pm
                    AEST 30/11/25. Max 1 entry/transaction. (hyperlink) T&amp;Cs apply.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Online banner ad (includes Social Media Ads)</h3>
                <p>
                    AU18+ and entitled to access The Star Gold Coast only. Ends 11:59pm
                    AEST 30/11/25. Max 1 entry/transaction. T&amp;Cs apply.
                </p>
                <p className="mt-2 italic">
                    The 'Online Banner Ad' copy above may only be used if the banner when
                    clicked will direct users to a website with an easily accessible link
                    to the full terms and conditions for the promotion.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Facebook Post</h3>
                <p>
                    AU18+ and entitled to access The Star Gold Coast only. Ends 11:59pm
                    AEST 30/11/25. Max 1 entry/transaction. T&amp;Cs apply, see URL.
                </p>
            </div>
        </div>
    );
};

export default AbridgedTermsData;
