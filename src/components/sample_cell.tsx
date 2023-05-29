'use client';
import {FC} from 'react';
import NextImage from 'next/image';
import { styled } from 'styled-components';
import { MyBarChartComp } from './../components/bar_chart';
import { Nomikatas, reqAlcohols, PatchRes} from './../lib/getJsonPlaceholder';
import {SuccessResult, FailResult} from './../../src/service/api';

const CellBase = styled.div`
margin: 0 50px;
padding: 8px 14px;
height:10;
background: rgba(0, 0, 0, 0.2);
color: #fff;
border: 1px solid #fff;
font-weight: 300;
border-radius: 30px 30px 30px 30px;
display: flex; 
`

const Title = styled.h2`
  color: #fff;
  font-weight: 300;
  inline-size: 200px;
  overflow-wrap: break-word;
`
const Date = styled.div`
  font-weight: 300;
  margin: 6px 0;
  color: rgba(0, 0, 0, 1)
`
const Description = styled.p`
  color: #fff;
  font-weight: 300;
`

const ImageComp = styled(NextImage)`
margin: 0 5px;
padding: 5px 5px;
`

const ActionButton = styled.button`
  margin: 0 5px;
  padding: 8px 10px;
  background: rgba(155, 155, 155, 0.2);
  cursor: pointer;
  border: 1px solid #fff;
  :hover {
    opacity: 0.8;
  }
`

export type Props = {
    title: String;
    imagePath: string;
    nomikatas: Nomikatas
    meigaraId: number
  }

export const SampleCard: FC<Props> = (prop) => {
    return (
      <div style={{ background: '#fff'}}>
        <CellBase>
            <MailItem title={prop.title} imagePath={prop.imagePath} nomikatas={prop.nomikatas} meigaraId={prop.meigaraId}/>
            <SubItem title={prop.title} imagePath={prop.imagePath} nomikatas={prop.nomikatas} meigaraId={prop.meigaraId}/>
        </CellBase>
      </div>
    );
  }

export const MailItem: FC<Props> = (prop) => {
    return (
        <div>
            <Title>{prop.title}</Title>
            <ImageComp
                    className="object-contain"
                    src={prop.imagePath}
                    alt='logo'
                    width="200"
                    height="250"
                    />
        </div>
    );
}

export const SubItem: FC<Props> = (prop) => {
    return (
        <div>
            <ActionButton onClick={function(){alert(prop.nomikatas.length);}}>0 Comments</ActionButton>
            <ActionButton>0 Likes</ActionButton>
            <ActionButton>0 Views</ActionButton>
            <MyBarChartComp list={prop.nomikatas} handle={async (nomikatas_id: number)  => {
              await reqAlcohols.patch(prop.meigaraId, nomikatas_id).
              then((res: SuccessResult<PatchRes> | FailResult<PatchRes>) => {alert(res.response)})
            }}/>
      </div>
    );
}