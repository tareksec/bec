'use client'
import CounterUp from "@/components/elements/CounterUp"


export default function Funfact(){
    return (
        <> 

        <section className="funfact-section centred pb_90">
            <div className="auto-container">
                <div className="row clearfix">
                    <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                        <div className="funfact-block-one">
                            <div className="inner-box">
                                <div className="count-outer">
                                    <CounterUp end={10000} /><span className="symble">+</span>
                                </div>
                                <p>Professionals Connected</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                        <div className="funfact-block-one">
                            <div className="inner-box">
                                <div className="count-outer">
                                    <CounterUp end={500} /><span className="symble">+</span>
                                </div>
                                <p>Partner Organizations</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                        <div className="funfact-block-one">
                            <div className="inner-box">
                                <div className="count-outer">
                                    <CounterUp end={2000} /><span className="symble">+</span>
                                </div>
                                <p>Career Opportunities Shared</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                        <div className="funfact-block-one">
                            <div className="inner-box">
                                <div className="count-outer">
                                    <CounterUp end={150} /><span className="symble">+</span>
                                </div>
                                <p>Training & Workshops Conducted</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 funfact-block">
                        <div className="funfact-block-one">
                            <div className="inner-box">
                                <div className="count-outer">
                                    <span className="bec-static-count">Nationwide</span>
                                </div>
                                <p>Impact Across Industries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
}
